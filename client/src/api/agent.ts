import axios, {AxiosResponse} from "axios";
import { IRoom } from "../models/room";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const Request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body:{}) => axios.post(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

export const RoomRequests = {
    getAllRooms : () : Promise<IRoom[]> => Request.get("/room"),
    getOneRoom: (id: string) : Promise<IRoom> => Request.get(`/room/${id}`),
    createRoom: (roomValues: IRoom): Promise<{}> => Request.post("/room", roomValues)
}