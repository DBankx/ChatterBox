import {RootStore} from "./rootStore";
import {action, observable} from "mobx";

export default class CommonStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    
    @observable visible: boolean = false;
    
    @action showModal = () => {
        this.visible = true;
    }
    
    @action cancelModal = () => {
        this.visible = false;
    }
}