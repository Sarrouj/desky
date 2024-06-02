import { StateCreator } from "zustand";
import axios from "axios";

export const SearchSlice: StateCreator<> = (set, get) => ({
    searchValue: "",
    CategoryValue: "",
    CityValue: "",
    searchedData: [],
    getSearchValue: (value) => set({ searchValue: value }),
    getCategoryValue: (value) => set({ CategoryValue: value }),
    getCityValue: (value) => set({ CityValue: value }),
    fetchSearchedOffers: async () => {
        const { searchValue, CategoryValue, CityValue } = get();
        let url = 'http://localhost:3001/search/offer?';

        // Build the URL based on the combination of values
        if (searchValue !== "" && CategoryValue !== "" && CityValue !== "") {
            url += `search=${searchValue}&category=${CategoryValue}&location=${CityValue}`;
        } else if (searchValue !== ""  && CategoryValue) {
            url += `search=${searchValue}&category=${CategoryValue}`;
        } else if ( searchValue !== ""  && CityValue !== "") {
            url += `search=${searchValue}&location=${CityValue}`;
        } else if (CategoryValue !== "" && CityValue !== "") {
            url += `category=${CategoryValue}&location=${CityValue}`;
        } else if (searchValue !== "" ) {
            url += `search=${searchValue}`;
        } else if (CategoryValue !== "") {
            url += `category=${CategoryValue}`;
        } else if (CityValue !== "") {
            url += `location=${CityValue}`;
        }
      
        try {
            const response = await axios.get(url);
            const data = response.data.success;
            set({ searchedData: data });
        } catch (error) {
            set({ searchedData: [] });
            console.error('Error fetching offers:', error);
        }
    },
});

