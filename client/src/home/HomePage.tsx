import React from "react";
import {Button, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const HomePage = () => {
    return (
        <div className={"jumbo-banner"}>
            <h1 className={"jumbo-text"}>Chat with millions of users across the world while keeping your identity safe.</h1>
            <div style={{textAlign: "center", marginTop: "1.5em"}}>
            <Space  align={"center"}>
                <Button shape={"round"} size={"large"} type={"primary"}>Start Chatting</Button>
                <Button shape={"round"} size={"large"} icon={<SearchOutlined />}>Find a room</Button>
            </Space>
            </div>
        </div>
    )
}

export default HomePage;