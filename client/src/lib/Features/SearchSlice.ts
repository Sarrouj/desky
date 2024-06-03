import { StateCreator } from "zustand";
import axios from "axios";

export const SearchSlice: StateCreator<> = (set, get) => ({
    searchValue: "",
    CategoryValue: "",
    CityValue: "",
    searchedData: [],
    offerIsLoading : false,
    getSearchValue: (value) => set({ searchValue: value }),
    getCategoryValue: (value) => set({ CategoryValue: value }),
    getCityValue: (value) => set({ CityValue: value }),
    fetchSearchedOffers: async () => {
        set({ offerIsLoading: true });
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
            set({ searchedData: data , offerIsLoading: false});
        } catch (error) {
            set({ searchedData: [] , offerIsLoading: false});
            console.error('Error fetching offers:', error);
        }
    },
});

