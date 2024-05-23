import { create } from "zustand"
import { createOffersSlice } from "./Features/offersSlice";
import { OffersState } from "./Features/offersSlice";



export const useBoundStore = create<OffersState>((...a) => ({
  ...createOffersSlice(...a),
}))

