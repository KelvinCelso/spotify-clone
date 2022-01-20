import { atom } from "recoil";

export const mainPageState= atom ({
    key:"MainPageState",
    default:"home",
})

export const LibraryState= atom ({
    key:"LibraryState",
    default:"albums",
})
export const PreviousPageState=atom({
    key:"PreviousPageState",
    default:null
})
