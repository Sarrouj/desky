import { create } from "zustand"
import { createOffersSlice } from "./Features/offersSlice";
import { OffersState } from "./Features/offersSlice";
import { createOfferDetailsSlice } from "./Features/offerDetailsSlice"; 
import { OfferDetails } from "./Features/offerDetailsSlice";



export const useBoundStore = create<OffersState & OfferDetails>((...a) => ({
  ...createOffersSlice(...a),
  ...createOfferDetailsSlice(...a)
}))

