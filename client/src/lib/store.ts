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
import { getDepositorLegalDataSlice } from "./Features/DepositorLegalInfo";
import { createOfferSlice } from "./Features/addOffer";
import { searchState } from "./Features/SearchSlice";
import { depositorDataInfoType } from "./Features/getDepositorInfo";
import { DepositorLegalData } from "./Features/DepositorLegalInfo";
import { addOfferState } from "./Features/addOffer";
import { DeleteOfferSlice } from "./Features/DeleteOffer";
import { deleteOfferState } from "./Features/DeleteOffer";
import { HandleCompleteSlice } from "./Features/HandleCompleteSlice";
import { HandleAcceptState } from "./Features/HandleCompleteSlice";

export interface CombinedState extends 
  OffersState, 
  OfferDetails,
  Cities,
  Categories,
  searchState,
  depositorDataInfoType,
  DepositorLegalData,
  addOfferState,
  deleteOfferState,
  HandleAcceptState {}

export const useBoundStore = create<CombinedState>((...a) => ({
  ...createOffersSlice(...a),
  ...createOfferDetailsSlice(...a),
  ...getDepositorDataSlice(...a),
  ...CitiesDataSlice(...a),
  ...CategoriesDataSlice(...a),
  ...SearchSlice(...a),
  ...getDepositorLegalDataSlice(...a),
  ...createOfferSlice(...a),
  ...DeleteOfferSlice(...a),
  ...HandleCompleteSlice(...a)
}))

