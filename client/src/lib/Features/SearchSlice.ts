import { StateCreator } from "zustand";

export const SearchSlice : StateCreator<> = (set) => ({
    searchValue : null,
    getSearchValue : (value) => set({ searchValue : value})
})
