import { StateCreator } from "zustand";
import axios from "axios";

interface depositorData {
  _id: string | number,
  company_type: string | number | any,
  company_name: string | string & number,
  company_phoneNumber: number,
  company_address: any,
  company_location: string,
  company_CR: number,
  company_DoA: Array<string>,
  company_size: string
}

export interface DepositorLegalData {
  DepositorLegalID : null | string & number | number;
  DespositorLegalData : depositorData | null ;
  depositorLegalInfoIsLoading : boolean;
  getDepositorLegalDataID : (id : string & number | number) => void;
  fetchDepositorLegalData : () => Promise<void>;
}

export const getDepositorLegalDataSlice : StateCreator<DepositorLegalData> = (set, get)=>({
    DepositorLegalID : null,
    DespositorLegalData : null,
    depositorLegalInfoIsLoading : false,
    getDepositorLegalDataID  : (id) => set({ DepositorLegalID : id }),
    fetchDepositorLegalData: async () => {
        set({ depositorLegalInfoIsLoading: true });
        const { DepositorLegalID } = get();
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/depositor/info/${DepositorLegalID}`);
        const data = response.data.success;
        set({ DespositorLegalData : data , depositorLegalInfoIsLoading: false});
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
})