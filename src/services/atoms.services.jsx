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

export const filterPopUpState = atom({
    key: "filterPopUpState",
    default: {
        isOpen: false,
        selectedItem: undefined
    }
});

export const selectedPageState = atom({
    key: "selectedPageState",
    default: PAGE_LIST.FLIGHT_DISTANCE_VS_TIME.key
});
