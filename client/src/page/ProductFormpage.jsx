import { Modal } from "antd";
import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import ProductDetails from "./ProductDetails";
const ProductFormpage = ({
    showProductform,
    setShowProductform,
    selectedproduct,
}) => {
    const items = [
        {
            key: "1",
            label: "General",
            children: (
                <ProductDetails
                    selectedproduct={selectedproduct}
                    setShowProductform={setShowProductform}
                />
            ),
        },
        {
            key: "2",
            label: "Image",
            children: <h1>Image</h1>,
        },
    ];

    return (
        <Modal
            title=""
            open={showProductform}
            onCancel={() => setShowProductform()}
            width={700}
            centered
            footer={null}
        >
            <div className="m-1 ">
                <Tabs defaultActiveKey="1" items={items} onChange={onchange} />
            </div>
        </Modal>
    );
};

export default ProductFormpage;
