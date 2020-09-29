import React, {useContext, useEffect} from "react";
import rootStoreContext from "../stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../home/Spinner";
import {observer} from "mobx-react-lite";
import RoomTop from "./RoomTop";
import RoomMessageSection from "./RoomMessageSection";
import RoomMessageInput from "./RoomMessageInput";

const RoomDisplay: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {JoinARoom, room, loadingInitial} = useContext(rootStoreContext).roomStore;
    const {CreateHubConnection, stopHubConnection} = useContext(rootStoreContext).roomStore;
    
    useEffect(() => {
        JoinARoom(match.params.id);
        if(room) CreateHubConnection(room.id);
        return () => {
            stopHubConnection();
        }
    }, [match.params.id, CreateHubConnection, stopHubConnection])
    
    if(loadingInitial) return <Spinner />
    
    return (<div>
        <RoomTop room={room!} />
        <RoomMessageSection room={room!} />
        <RoomMessageInput room={room!} />
    </div>)
}

export default observer(RoomDisplay);