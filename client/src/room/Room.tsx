import React, {useContext, useEffect} from "react";
import RoomFindInput from "./RoomFindInput";
import Rooms from "./Rooms";
import rootStoreContext from "../stores/rootStore";
import Spinner from "../home/Spinner";
import {observer} from "mobx-react-lite"

const Room = () => {

    const {loadingInitial, getAllRooms} = useContext(rootStoreContext).roomStore;

    useEffect(() => {
        getAllRooms()
    }, [getAllRooms])

    if(loadingInitial) return <Spinner />

    return (
        <div>
            <RoomFindInput />
            <Rooms />
        </div>
    )
}

export default observer(Room);