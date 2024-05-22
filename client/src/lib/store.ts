import { create } from "zustand"
import { Offers } from "@/lib/api/Offers";

let data = Offers();

type State = {
  firstName : string,
  lastName : string
}

type Action = {
  updateFirstName : (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))


export const useOffers = create(()=>({
  offersData : data,
}))

