import { StateCreator } from "zustand";

interface Category {
    value : string;
    label : string;
}

export interface Categories{
    Categories : Category[]
}

export const CategoriesDataSlice : StateCreator<Categories> = () =>({
    Categories : [
        {
            value: "all categories",
            label: "All categories",
          },
          {
            value: "agriculture and food",
            label: "Agriculture and food",
          },
          {
            value: "construction and real estate",
            label: "Construction and real estate",
          },
          {
            value: "energy",
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
    ]
})
