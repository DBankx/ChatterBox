import React from "react";
import {IRoom} from "../models/room";
import {observer} from "mobx-react-lite";
import {CloseCircleOutlined, SettingOutlined} from "@ant-design/icons";
import {Button, Divider} from "antd";

interface IProps{
    room: IRoom
}

const RoomTop: React.FC<IProps> = ({room}) => {
    return (
        <div className={"room-head"}>
            <span>{room && room.title}</span>
            <div>
            <SettingOutlined />
            <Divider type={"vertical"} />
            <Button danger icon={<CloseCircleOutlined />}>Leave Room</Button>
            </div>
            </div>
    )
}

export default observer(RoomTop);