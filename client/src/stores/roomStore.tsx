import {action, computed, observable, runInAction} from "mobx";
import {RootStore} from "./rootStore";
import { IRoom } from "../models/room";
import {RoomRequests} from "../api/agent";

export class RoomStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    
    @observable rooms: Map<string, IRoom> = new Map();
    @observable loadingInitial: boolean = false;
    
    @computed get GetRoomsArray(){
        return Array.from(this.rooms.values());
    }
    
    @action getAllRooms = async () => {
        this.loadingInitial = true;
        try{
            let rooms: IRoom[] = await RoomRequests.getAllRooms();
            runInAction(() => {
              rooms.forEach((room: IRoom) => {
                  room.createdAt = room.createdAt.split("T")[0];
                 this.rooms.set(room.id, room); 
              })
                this.loadingInitial = false
            })
        }catch(error){
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error)
        }
    }
    
}