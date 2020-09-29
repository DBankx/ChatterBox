import React, {useContext} from "react";
import {Button, Space} from "antd";
import {SearchOutlined, UserOutlined} from "@ant-design/icons";
import {history} from "../index";
import CreateRoomModal from "../room/CreateRoomModal";
import rootStoreContext from "../stores/rootStore";
import { Link } from "react-router-dom";



const Navbar = () => {
    const {showModal} = useContext(rootStoreContext).commonStore;
    const {username} = useContext(rootStoreContext).roomStore;
    return (
        <div className={"container"}>
            <div className={"navbar"}>
                <Space>
                    <img alt={"logo"} src={"/assets/logo.svg"} className={"navbar-logo"}/>
                    <Link to={"/"}><h1>ChatterBox</h1></Link>
                </Space>
                <Space>
                    <Button shape={"round"} type={"primary"} onClick={() => showModal()}>Create a
                        room</Button>
                    <CreateRoomModal />
                  
                    <Button shape={"round"} icon={<SearchOutlined/>} onClick={() => history.push("/rooms")}>Find a room</Button>
                    {username === null && localStorage.getItem("username") === null ? null : (<span style={{fontSize: "1.25em"}}><UserOutlined />{username || localStorage.getItem("username")}</span>)}
                </Space>
            </div>
        </div>
    )
}

export default Navbar;