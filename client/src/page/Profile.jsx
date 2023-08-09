import React from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Product from "../page/Product";
const Profile = () => {
    const items = [
        {
            key: "1",
            label: "Product",
            children: <Product />,
        },
        {
            key: "2",
            label: "Bid",
            children: <h1>heelo2</h1>,
        },
        {
            key: "3",
            label: "General",
            children: "Content of Tab Pane1",
        },
    ];
    return (
        <div className="m-1">
            <Tabs defaultActiveKey="1" items={items} onChange={onchange} />
        </div>
    );
};

export default Profile;
