import React from "react";
import {Input} from "antd";

const {Search} = Input;

const RoomFindInput = () => {
    return (
        <div style={{textAlign: "center"}}>
            <Search placeholder={"Find a room"} size={"large"} allowClear={true} />
        </div>
    )
};

export default RoomFindInput;