import { create } from "zustand";
import { createOffersSlice } from "./Features/offersSlice";
import { OffersState } from "./Features/offersSlice";
import { createOfferDetailsSlice } from "./Features/offerDetailsSlice";
import { OfferDetails } from "./Features/offerDetailsSlice";
import { getDepositorDataSlice } from "./Features/getDepositorInfo";
import { CitiesDataSlice } from "./Features/CitiesData";
import { Cities } from "./Features/CitiesData";
import { CategoriesDataSlice } from "./Features/CategoriesData";
import { Categories } from "./Features/CategoriesData";
import { SearchSlice } from "./Features/SearchSlice";


export const useBoundStore = create<OffersState & OfferDetails & Cities & Categories>((...a) => ({
  ...createOffersSlice(...a),
  ...createOfferDetailsSlice(...a),
  ...getDepositorDataSlice(...a),
  ...CitiesDataSlice(...a),
  ...CategoriesDataSlice(...a),
  ...SearchSlice(...a)
}))

