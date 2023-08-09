import { Button } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import ProductFormpage from "./ProductFormpage";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { GetallProducts } from "../axios/product";
import { loaderAction } from "../redux/loaderSlice";
import { message } from "antd";
const Product = () => {
    const [product, setproduct] = useState(null);
    const [showProductform, setShowProductform] = useState(false);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        setShowProductform((prev) => {
            return !prev;
        });
    };
    const getproduct = async () => {
        try {
            dispatch(loaderAction.Setloader(true));
            const response = await GetallProducts();

            if (response.success) {
                setproduct(response.data);
                dispatch(loaderAction.Setloader(false));
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            dispatch(loaderAction.Setloader(false));
            message.error(error.message);
        }
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className="flex gap-5   items-center">
                        <i className="ri-delete-bin-line"></i>
                        <i className="ri-pencil-line"></i>
                    </div>
                );
            },
        },
    ];
    useEffect(() => {
        getproduct();
        console.log(product);
    }, []);
    return (
        <div>
            <div className="flex justify-end ">
                <Button type="default" onClick={onClickHandler}>
                    ADD Product
                </Button>
            </div>
            <Table
                className="m-3 border-b-2"
                columns={columns}
                dataSource={product}
            />
            {showProductform && (
                <ProductFormpage
                    showProductform={showProductform}
                    setShowProductform={onClickHandler}
                />
            )}
        </div>
    );
};

export default Product;
