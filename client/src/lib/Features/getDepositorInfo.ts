import { StateCreator } from "zustand";
import axios from "axios";

export const getDepositorDataSlice : StateCreator<> = (set, get)=>({
    DepositorID : null,
    DespositorData : [],
    getDepositorID  : (id) => set({ DepositorID : id }),
    fetchDepositorData: async () => {
        const { DepositorID } = get();
      try {
        const response = await axios.get(`http://localhost:3001/depositor/${DepositorID}`);
        const data = response.data.success;
        set({ DespositorData : data });
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
})