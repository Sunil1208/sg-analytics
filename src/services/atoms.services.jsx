import { atom } from "recoil";

export const loaderState = atom({
    key: "loading",
    default: false
});

export const flightDataState = atom({
    key: "flightData",
    default: undefined
});

