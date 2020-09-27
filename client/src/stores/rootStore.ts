import {createContext} from "react";
import {RoomStore} from "./roomStore";
import {configure} from "mobx";

configure({enforceActions: "always"})

export class RootStore{
    roomStore: RoomStore
    constructor() {
        this.roomStore = new RoomStore(this);
    }
}

const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;