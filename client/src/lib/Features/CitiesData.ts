import { StateCreator } from "zustand";

export interface City {
    value : string;
    label : string;
}
export  interface Cities {
    CitiesEN : City[];
    CitiesFR : City[];
}

export const CitiesDataSlice : StateCreator<Cities> = () =>({
    CitiesEN : [
    {
        value: "rabat",
        label: "Rabat",
    },
    {
        value: "marrakech",
        label: "Marrakech",
    },
    {
        value: "fes",
        label: "Fes",
    },
    {
        value: "meknes",
        label: "Meknes",
    },
    {
        value: "tangier",
        label: "Tangier",
    },
    {
        value: "agadir",
        label: "Agadir",
    },
    {
        value: "oujda",
        label: "Oujda",
    },
    {
        value: "kenitra",
        label: "Kenitra",
    },
    {
        value: "tetouan",
        label: "Tetouan",
    },
    {
        value: "safi",
        label: "Safi",
    },
    {
        value: "temara",
        label: "Temara",
    },
    {
        value: "mohammedia",
        label: "Mohammedia",
    },
    {
        value: "el jadida",
        label: "El Jadida",
    },
    {
        value: "nador",
        label: "Nador",
    },
    {
        value: "khemisset",
        label: "Khemisset",
    },
    {
        value: "settat",
        label: "Settat",
    },
    {
        value: "sale",
        label: "Sale",
    },
    {
        value: "berrechid",
        label: "Berrechid",
    },
    {
        value: "khenifra",
        label: "Khenifra",
    },
    {
        value: "benslimane",
        label: "Benslimane",
    },
    {
        value: "larache",
        label: "Larache",
    },
    {
        value: "guelmim",
        label: "Guelmim",
    },
    {
        value: "tiznit",
        label: "Tiznit",
    },
    {
        value: "tan tan",
        label: "Tan Tan",
    },
    {
        value: "essaouira",
        label: "Essaouira",
    },
    {
        value: "errachidia",
        label: "Errachidia",
    },
    {
        value: "taza",
        label: "Taza",
    },
    {
        value: "taourirt",
        label: "Taourirt",
    },
    {
        value: "jerada",
        label: "Jerada",
    },
    {
        value: "guercif",
        label: "Guercif",
    },
    {
        value: "beni_mellal",
        label: "Beni Mellal",
    },
    {
        value: "khouribga",
        label: "Khouribga",
    },
    {
        value: "taounate",
        label: "Taounate",
    },
    {
        value: "midelt",
        label: "Midelt",
    },
    {
        value: "figuig",
        label: "Figuig",
    },
    {
        value: "boujdour",
        label: "Boujdour",
    },
    {
        value: "smara",
        label: "Smara",
    },
    {
        value: "dakhla",
        label: "Dakhla",
    },
    {
        value: "asni",
        label: "Asni",
    },
    {
        value: "azilal",
        label: "Azilal",
    },
    {
        value: "beni ansar",
        label: "Beni Ansar",
    },
    {
        value: "beni tajite",
        label: "Beni Tajite",
    },
    {
        value: "chefchaouen",
        label: "Chefchaouen",
    },
    {
        value: "chichaoua",
        label: "Chichaoua",
    },
    {
        value: "el kelaa des sraghna",
        label: "El Kelaa des Sraghna",
    },
    {
        value: "erfoud",
        label: "Erfoud",
    },
    {
        value: "ifran",
        label: "Ifran",
    },
    {
        value: "inezgane",
        label: "Inezgane",
    },
    {
        value: "jerada",
        label: "Jerada",
    },
    {
        value: "kalaa seraghna",
        label: "Kalaa Seraghna",
    },
    {
        value: "kasba tadla",
        label: "Kasba Tadla",
    },
    {
        value: "khouribga",
        label: "Khouribga",
    },
    {
        value: "kelaa mgouna",
        label: "Kelaa Mgouna",
    },
    {
        value: "ksar el kebir",
        label: "Ksar el Kebir",
    },
    {
        value: "laayoune",
        label: "Laayoune",
    },
    {
        value: "marrakesh",
        label: "Marrakesh",
    },
    {
        value: "martil",
        label: "Martil",
    },
    {
        value: "merzouga",
        label: "Merzouga",
    },
    {
        value: "midelt",
        label: "Midelt",
    },
    {
        value: "nador",
        label: "Nador",
    },
    {
        value: "oualidia",
        label: "Oualidia",
    },
    {
        value: "ouarzazate",
        label: "Ouarzazate",
    },
    {
        value: "ouazzane",
        label: "Ouazzane",
    },
    {
        value: "oued zem",
        label: "Oued Zem",
    },
    {
        value: "oulad teima",
        label: "Oulad Teima",
    },
    {
        value: "rissani",
        label: "Rissani",
    },
    {
        value: "sidi bennour",
        label: "Sidi Bennour",
    },
    {
        value: "sidi ifni",
        label: "Sidi Ifni",
    },
    {
        value: "sidi rahhal",
        label: "Sidi Rahhal",
    },
    {
        value: "skhirat",
        label: "Skhirat",
    },
    {
        value: "tahanaout",
        label: "Tahanaout",
    },
    {
        value: "tanger",
        label: "Tanger",
    },
    {
        value: "taounate",
        label: "Taounate",
    },
    {
        value: "tarfaya",
        label: "Tarfaya",
    },
    {
        value: "taroudant",
        label: "Taroudant",
    },
    {
        value: "taounate",
        label: "Taounate",
    },
    {
        value: "taza",
        label: "Taza",
    },
    {
        value: "tinghir",
        label: "Tinghir",
    },
    {
        value: "tirhanimine",
        label: "Tirhanimine",
    },
    {
        value: "tiznit",
        label: "Tiznit",
    },
    {
        value: "zagora",
        label: "Zagora",
    }],
    CitiesFR : [
        {
          value: "rabat",
          label: "Rabat",
        },
        {
          value: "marrakech",
          label: "Marrakech",
        },
        {
          value: "fes",
          label: "Fès",
        },
        {
          value: "meknes",
          label: "Meknès",
        },
        {
          value: "tangier",
          label: "Tanger",
        },
        {
          value: "agadir",
          label: "Agadir",
        },
        {
          value: "oujda",
          label: "Oujda",
        },
        {
          value: "kenitra",
          label: "Kénitra",
        },
        {
          value: "tetouan",
          label: "Tétouan",
        },
        {
          value: "safi",
          label: "Safi",
        },
        {
          value: "temara",
          label: "Témara",
        },
        {
          value: "mohammedia",
          label: "Mohammédia",
        },
        {
          value: "el jadida",
          label: "El Jadida",
        },
        {
          value: "nador",
          label: "Nador",
        },
        {
          value: "khemisset",
          label: "Khémisset",
        },
        {
          value: "settat",
          label: "Settat",
        },
        {
          value: "sale",
          label: "Salé",
        },
        {
          value: "berrechid",
          label: "Berrechid",
        },
        {
          value: "khenifra",
          label: "Khénifra",
        },
        {
          value: "benslimane",
          label: "Benslimane",
        },
        {
          value: "larache",
          label: "Larache",
        },
        {
          value: "guelmim",
          label: "Guelmim",
        },
        {
          value: "tiznit",
          label: "Tiznit",
        },
        {
          value: "tan tan",
          label: "Tan-Tan",
        },
        {
          value: "essaouira",
          label: "Essaouira",
        },
        {
          value: "errachidia",
          label: "Errachidia",
        },
        {
          value: "taza",
          label: "Taza",
        },
        {
          value: "taourirt",
          label: "Taourirt",
        },
        {
          value: "jerada",
          label: "Jérada",
        },
        {
          value: "guercif",
          label: "Guercif",
        },
        {
          value: "beni_mellal",
          label: "Béni Mellal",
        },
        {
          value: "khouribga",
          label: "Khouribga",
        },
        {
          value: "taounate",
          label: "Taounate",
        },
        {
          value: "midelt",
          label: "Midelt",
        },
        {
          value: "figuig",
          label: "Figuig",
        },
        {
          value: "boujdour",
          label: "Boujdour",
        },
        {
          value: "smara",
          label: "Smara",
        },
        {
          value: "dakhla",
          label: "Dakhla",
        },
        {
          value: "asni",
          label: "Asni",
        },
        {
          value: "azilal",
          label: "Azilal",
        },
        {
          value: "beni ansar",
          label: "Béni Ansar",
        },
        {
          value: "beni tajite",
          label: "Béni Tajite",
        },
        {
          value: "chefchaouen",
          label: "Chefchaouen",
        },
        {
          value: "chichaoua",
          label: "Chichaoua",
        },
        {
          value: "el kelaa des sraghna",
          label: "El Kelaa des Sraghna",
        },
        {
          value: "erfoud",
          label: "Erfoud",
        },
        {
          value: "ifran",
          label: "Ifrane",
        },
        {
          value: "inezgane",
          label: "Inezgane",
        },
        {
          value: "kalaa seraghna",
          label: "Kalaât Sraghna",
        },
        {
          value: "kasba tadla",
          label: "Kasba Tadla",
        },
        {
          value: "kelaa mgouna",
          label: "Kelaât M'gouna",
        },
        {
          value: "ksar el kebir",
          label: "Ksar el-Kébir",
        },
        {
          value: "laayoune",
          label: "Laâyoune",
        },
        {
          value: "marrakesh",
          label: "Marrakech",
        },
        {
          value: "martil",
          label: "Martil",
        },
        {
          value: "merzouga",
          label: "Merzouga",
        },
        {
          value: "midelt",
          label: "Midelt",
        },
        {
          value: "nador",
          label: "Nador",
        },
        {
          value: "oualidia",
          label: "Oualidia",
        },
        {
          value: "ouarzazate",
          label: "Ouarzazate",
        },
        {
          value: "ouazzane",
          label: "Ouazzane",
        },
        {
          value: "oued zem",
          label: "Oued Zem",
        },
        {
          value: "oulad teima",
          label: "Oulad Teïma",
        },
        {
          value: "rissani",
          label: "Rissani",
        },
        {
          value: "sidi bennour",
          label: "Sidi Bennour",
        },
        {
          value: "sidi ifni",
          label: "Sidi Ifni",
        },
        {
          value: "sidi rahhal",
          label: "Sidi Rahhal",
        },
        {
          value: "skhirat",
          label: "Skhirat",
        },
        {
          value: "tahanaout",
          label: "Tahanaout",
        },
        {
          value: "tanger",
          label: "Tanger",
        },
        {
          value: "taounate",
          label: "Taounate",
        },
        {
          value: "tarfaya",
          label: "Tarfaya",
        },
        {
          value: "taroudant",
          label: "Taroudant",
        },
        {
          value: "taza",
          label: "Taza",
        },
        {
          value: "tinghir",
          label: "Tinghir",
        },
        {
          value: "tirhanimine",
          label: "Tirhanimine",
        },
        {
          value: "tiznit",
          label: "Tiznit",
        },
        {
          value: "zagora",
          label: "Zagora",
        }
    ]
      
})