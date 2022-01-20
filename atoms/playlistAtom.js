
import { atom } from "recoil";

export const playlistState= atom ({
    key:"playlistState",
    default:null,
})

export const playlistIdState=atom({
    key:"playlistIdState",
    default:"6lIkiyoaSuFgdvpKCEafEQ"
})

export const albumIdState=atom({
    key:"albumIdState",
    default:null,
})
export const albumState=atom({
    key:"albumState",
    default:null,
})

export const albumSelectedState=atom({
    key:"albumSelected",
    default:false,
})