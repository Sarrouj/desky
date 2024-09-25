import { StateCreator } from "zustand";
import axios from "axios";

export interface DepositorManageBidsData {
  DepositorManageBidsID : any;
  DepositorManageBidsData : any;
  depositorManageBidsIsLoading : any;
  getDepositorManageBidsID: (id: (string & number) | number) => void;
  fetchDepositorManageBidsData: () => Promise<void>;
}

export const DepositorBids: StateCreator<DepositorManageBidsData> = (
  set,
  get
) => ({
  DepositorManageBidsID: 0,
  DepositorManageBidsData: null,
  depositorManageBidsIsLoading: false,
  getDepositorManageBidsID: (id) => set({ DepositorManageBidsID: id }),
  fetchDepositorManageBidsData: async () => {
    set({ depositorManageBidsIsLoading: true });
    const { DepositorManageBidsID } = get();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BackendURL}/depositor/dashboard/${DepositorManageBidsID}`
      );
      const data = response.data.success;
      set({ DepositorManageBidsData: data, depositorManageBidsIsLoading: false });
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  },
});

