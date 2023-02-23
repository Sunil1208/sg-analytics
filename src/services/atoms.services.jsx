import { atom } from "recoil";
import { PAGE_LIST } from "../constants";

export const loaderState = atom({
    key: "loading",
    default: false
});

export const flightDataState = atom({
    key: "flightData",
    default: undefined
});

export const filteredflightDataState = atom({
    key: "filteredflightDataState",
    default: undefined
});

export const filterPopUpState = atom({
    key: "filterPopUpState",
    default: {
        isOpen: false,
        appliedFilters: {
            carriers: [],
            origins: [],
            startYear: "",
            endYear: ""
        }
    }
});

export const selectedPageState = atom({
    key: "selectedPageState",
    default: PAGE_LIST.FLIGHT_DISTANCE_VS_TIME.key
});

export const filterOptionDataState = atom({
    key: "filterOptionDataState",
    default: {
        origins: undefined,
        carriers: undefined,
        years: undefined
    }
});
