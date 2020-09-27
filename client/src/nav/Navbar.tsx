import React from "react";
import {Button, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const Navbar = () => {
    return (
        <div className={"container"}>
        <div className={"nav"}>
            <div className={"navbar"}>
                <div className={"nav-logo"}>
                    <img alt={"logo"} src={"/assets/logo.svg"} className={"navbar-logo"} />
                    <h1>ChatterBox</h1>
                </div>
                    <Space>
                    <Button shape={"round"} type={"primary"}>Create a room</Button>
                    <Button shape={"round"} icon={<SearchOutlined />}>Find a room</Button>
                    </Space>
            </div>
        </div>
        </div>
    )    
}

export default Navbar;