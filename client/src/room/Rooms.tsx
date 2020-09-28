import React, {useContext, useEffect} from "react";
import rootStoreContext from "../stores/rootStore";
import { observer } from "mobx-react-lite";
import {Button, List, Tag} from "antd";
import { IRoom } from "../models/room";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

const Rooms = () => {
    
    const {GetRoomsArray} = useContext(rootStoreContext).roomStore;
  
    return (
        <div style={{marginTop: "2em"}}>
            <Tag color={"green"}>{GetRoomsArray.length + " Room(s) found"}</Tag>
          <List itemLayout={"horizontal"} dataSource={GetRoomsArray} renderItem={(room: IRoom) => (
                <List.Item actions={[<Button type={"primary"} icon={<UserOutlined />}>Join Room</Button>]}>
                    <List.Item.Meta title={room.title} description={room.about} />
                    <div><CalendarOutlined /> {room.createdAt}</div>
                </List.Item>
            )} />
        </div>
    )
}

export default observer(Rooms);