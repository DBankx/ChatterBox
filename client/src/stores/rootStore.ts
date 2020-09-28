import {createContext} from "react";
import {RoomStore} from "./roomStore";
import {configure} from "mobx";
import CommonStore from "./commonStore";

configure({enforceActions: "always"})

export class RootStore{
    roomStore: RoomStore
    commonStore: CommonStore
    constructor() {
        this.roomStore = new RoomStore(this);
        this.commonStore = new CommonStore(this);
    }
}

const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;