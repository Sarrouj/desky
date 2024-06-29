import { StateCreator } from "zustand";

interface Category {
    value : string;
    label : string;
}

export interface Categories{
    CategoriesEN : Category[];
    CategoriesFR : Category[];
}

export const CategoriesDataSlice : StateCreator<Categories> = () =>({
    CategoriesEN : [
          {
            value: "agriculture and food",
            label: "Agriculture and food",
          },
          {
            value: "construction and real estate",
            label: "Construction and real estate",
          },
          {
            value: "Energy",
            label: "Energy",
          },
          {
            value: "environment and sanitation",
            label: "Environment and sanitation",
          },
          {
            value: "finance",
            label: "Finance",
          },
          {
            value: "information technology",
            label: "Information technology",
          },
          {
            value: "materials and products",
            label: "Materials and products",
          },
          {
            value: "security",
            label: "Security",
          },
          {
            value: "services",
            label: "Services",
          },
          {
            value: "sports and leisure",
            label: "Sports and leisure",
          },
          {
            value: "technology and equipment",
            label: "Technology and equipment",
          },
          {
            value: "transportation",
            label: "Transportation",
          },
          {
            value: "education",
            label: "Education",
          },
          {
            value: "health and medicine",
            label: "Health and medicine",
          },
          {
            value: "arts and culture",
            label: "Arts and culture",
          },
          {
            value: "retail and commerce",
            label: "Retail and commerce",
          },
          {
            value: "hospitality and tourism",
            label: "Hospitality and tourism",
          },
          {
            value: "manufacturing",
            label: "Manufacturing",
          },
          {
            value: "media and communications",
            label: "Media and communications",
          },
          {
            value: "non profit and volunteer",
            label: "Non-profit and volunteer",
          },
          {
            value: "personal care and services",
            label: "Personal care and services",
          },
          {
            value: "professional services",
            label: "Professional services",
          },
    ],
    CategoriesFR: [
      {
        value: "agriculture and food",
        label: "Agriculture et alimentation",
      },
      {
        value: "construction and real estate",
        label: "Construction et immobilier",
      },
      {
        value: "Energy",
        label: "Énergie",
      },
      {
        value: "environment and sanitation",
        label: "Environnement et assainissement",
      },
      {
        value: "finance",
        label: "Finance",
      },
      {
        value: "information technology",
        label: "Technologies de l'information",
      },
      {
        value: "materials and products",
        label: "Matériaux et produits",
      },
      {
        value: "security",
        label: "Sécurité",
      },
      {
        value: "services",
        label: "Services",
      },
      {
        value: "sports and leisure",
        label: "Sports et loisirs",
      },
      {
        value: "technology and equipment",
        label: "Technologie et équipement",
      },
      {
        value: "transportation",
        label: "Transport",
      },
      {
        value: "education",
        label: "Éducation",
      },
      {
        value: "health and medicine",
        label: "Santé et médecine",
      },
      {
        value: "arts and culture",
        label: "Arts et culture",
      },
      {
        value: "retail and commerce",
        label: "Commerce de détail et commerce",
      },
      {
        value: "hospitality and tourism",
        label: "Hôtellerie et tourisme",
      },
      {
        value: "manufacturing",
        label: "Fabrication",
      },
      {
        value: "media and communications",
        label: "Médias et communications",
      },
      {
        value: "non profit and volunteer",
        label: "Organisme à but non lucratif et bénévolat",
      },
      {
        value: "personal care and services",
        label: "Soins personnels et services",
      },
      {
        value: "professional services",
        label: "Services professionnels",
      },
    ]
    
})
