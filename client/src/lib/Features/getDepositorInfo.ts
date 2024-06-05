import { StateCreator } from "zustand";
import axios from "axios";

export const getDepositorDataSlice : StateCreator<> = (set, get)=>({
    DepositorID : null,
    DespositorData : [],
    depositorInfoIsLoading : false,
    getDepositorID  : (id) => set({ DepositorID : id }),
    fetchDepositorData: async () => {
      set({ depositorInfoIsLoading: true });
        const { DepositorID } = get();
      try {
        const response = await axios.get(`http://localhost:3001/depositor/${DepositorID}`);
        const data = response.data.success;
        set({ DespositorData : data , depositorInfoIsLoading: false});
      } catch (error) {
        console.error('Error fetching offers:', error);
        set({ depositorInfoIsLoading: false});
      }
    },
})