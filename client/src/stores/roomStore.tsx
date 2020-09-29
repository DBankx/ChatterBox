import {action, computed, observable, runInAction} from "mobx";
import {RootStore} from "./rootStore";
import {IRoom} from "../models/room";
import {RoomRequests} from "../api/agent";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {toast} from "react-toastify";

export class RoomStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    
    @observable rooms: Map<string, IRoom> = new Map();
    @observable loadingInitial: boolean = false;
    @observable room: IRoom | null = null;
    @observable.ref hubConnection: HubConnection | null = null;
    @observable username: string | null = null; 
    
    @computed get GetRoomsArray(){
        return Array.from(this.rooms.values());
    }
    
    @action CreateHubConnection = (roomId: string) => {
        try{
        this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/chat").configureLogging(LogLevel.Information).build();
        
        this.hubConnection.start().then(() => console.log(this.hubConnection!.state)).then(() => {
            console.log("Attempting to join room");
            this.hubConnection!.invoke("AddToGroup", roomId, localStorage.getItem("username"));
        }).catch(error => console.log("Error establishing connection", error))

        this.hubConnection.on("RecieveMessage", message => {
            runInAction(() => {
                this.room!.messages.push(message);
            })
        })

        this.hubConnection.on("Send", message => {
            toast.info(message);
        })
        }catch(error){
            toast.error("Could not connect to room - try rejoining")
        }
    }
    
    @action createUsername = (value: string) => {
        this.username = value;
        localStorage.setItem("username", value);
    }
    
    @action stopHubConnection = () => {
        this.hubConnection?.invoke("RemoveFromGroup", this.room!.id, localStorage.getItem("username")).then(() => this.hubConnection!.stop().then(() => console.log("Connection stopped")))
    }
    
    @action sendMessage = async(values: any) => {
        values.roomId = this.room?.id;
        try{
           await this.hubConnection!.invoke("SendMessage", values);
        }catch(error){
            console.log(error);
        }
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
    
    @action CreateRoom = async(room: IRoom) => {
        try{
            await RoomRequests.createRoom(room);
            room.messages = [];
            runInAction(() => {
                this.rooms.set(room.id, room);
            })
        } catch(error){
            console.log(error);
        }
    }
    
    @action JoinARoom = async(id: string) => {
        this.loadingInitial = true;
        try{
            let room = this.rooms.get(id);
            if(room){
                this.room = room;
                this.loadingInitial = false;
            } else {
                let room = await RoomRequests.getOneRoom(id);
                runInAction(() => {
                    this.room = room
                    this.loadingInitial = false;
                })
            } 
            
        }catch(error){
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    }
    
}