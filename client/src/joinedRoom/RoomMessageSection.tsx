import React from "react";
import {IRoom} from "../models/room";
import {Empty} from "antd";
import {observer} from "mobx-react-lite";

const RoomMessageSection: React.FC<{room: IRoom}> = ({room}) => {
    
    return(
            <div className="chat-history">
                <ul>
                    {room && room.messages.length > 0 ? (room.messages.map(message => {
                        if(message.username === localStorage.getItem("username")){
                            return( 
                                <li key={message.id} className="clearfix">
                                    <div className="message-data align-right">
                                        <span className="message-data-time" >{message.createdAt}</span> &nbsp; &nbsp;
                                        <span className="message-data-name" >{message.username}</span>

                                    </div>
                                    <div className="message other-message float-right">
                                        {message.body}
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={message.id}>
                                    <div className="message-data">
                                        <span className="message-data-name">{message.username}</span>
                                        <span className="message-data-time">{message.createdAt}</span>
                                    </div>
                                    <div className="message my-message">
                                        {message.body}
                                    </div>
                                </li>
                            )
                        }
                    })) : (<Empty description={<span>No messages yet</span>} />)}
                </ul>
            </div>
    )
}

export default observer(RoomMessageSection);