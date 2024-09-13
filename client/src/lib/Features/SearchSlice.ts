import { StateCreator } from "zustand";
import axios from "axios";
// offer Interface
import { Offer } from "./offersSlice";


export interface searchState{
    searchValue: string | number & string;
    CategoryValue: string;
    CityValue : string;
    searchedData: Array<Offer>;
    offerIsLoading : boolean;
    getSearchValue : (value: string | number & string) => void;
    getCategoryValue : (value : string) => void;
    getCityValue : (value : string) => void;
    fetchSearchedOffers : () => Promise<void>;
}

export const SearchSlice: StateCreator<searchState> = (set, get) => ({
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
        let url = 'https://desky-2.onrender.com/search/offer?';

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
            if(data){
                let openOffers = [...data];
                let filterByOpen = openOffers.filter((a)=> a.offer_state == "open")
                set({ searchedData: filterByOpen , offerIsLoading: false});
            }   
        } catch (error) {
            set({ searchedData: [] , offerIsLoading: false});
            console.error('Error fetching offers:', error);
        }
    },
});

