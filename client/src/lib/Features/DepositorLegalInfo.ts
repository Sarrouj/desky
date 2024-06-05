import { StateCreator } from "zustand";
import axios from "axios";

export const getDepositorLegalDataSlice : StateCreator<> = (set, get)=>({
    DepositorLegalID : null,
    DespositorLegalData : [],
    depositorLegalInfoIsLoading : false,
    getDepositorLegalDataID  : (id) => set({ DepositorLegalID : id }),
    fetchDepositorLegalData: async () => {
        set({ depositorLegalInfoIsLoading: true });
        const { DepositorLegalID } = get();
      try {
        const response = await axios.get(`http://localhost:3001/depositor/info/${DepositorLegalID}`);
        const data = response.data.success;
        set({ DespositorLegalData : response , depositorLegalInfoIsLoading: false});
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
})