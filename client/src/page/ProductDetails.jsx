import React from "react";
import { useEffect, useState } from "react";
import { AddProduct, EditProducts } from "../axios/product";
import { useDispatch } from "react-redux";
import { loaderAction } from "../redux/loaderSlice";
import { message } from "antd";
const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const additionalThings = [
        {
            label: "Bill Available",
            name: "billAvailable",
        },
        {
            label: "Warranty Available",
            name: "warrantyAvailable",
        },
        {
            label: "Accessories Available",
            name: "accessoriesAvailable",
        },
        {
            label: "Box Available",
            name: "boxAvailable",
        },
    ];
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "electronics",
        age: "",
        billAvailable: false,
        warrantyAvailable: false,
        accessoriesAvailable: false,
        boxAvailable: false,
    });
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const formsubmithandler = async (event) => {
        event.preventDefault();
        try {
            dispatch(loaderAction.Setloader(true));
            let response;

            if (!props.selectedproduct) {
                response = await AddProduct(formData);
            } else {
                response = await EditProducts(formData);
            }

            if (response.success) {
                message.success(response.message);
                props.setShowProductform();
            } else {
                throw new Error(response.message);
            }
            dispatch(loaderAction.Setloader(false));
        } catch (error) {
            message.error(error.message);
            dispatch(loaderAction.Setloader(false));
        }
    };

    useEffect(() => {
        if (props.selectedproduct) {
            setFormData((prev) => {
                return { ...prev, ...props.selectedproduct };
            });
        } else {
            setFormData((prev) => {
                return {
                    ...prev,
                    name: "",
                    description: "",
                    price: "",
                    category: "electronics",
                    age: "",
                    billAvailable: false,
                    warrantyAvailable: false,
                    accessoriesAvailable: false,
                    boxAvailable: false,
                };
            });
        }
    }, [props.selectedproduct]);

    return (
        <div className="mt-1 p-3 ">
            <form onSubmit={formsubmithandler}>
                <label className="font-bold">
                    Name:
                    <input
                        className="w-full m-3 p-1 h-[45]px"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label className="font-bold">
                    Description:
                    <textarea
                        className="w-full m-3 p-1 h-[45]px"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                        <label className="font-bold">
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <label className="font-bold  flex flex-col">
                        Category:
                        <select
                            className="w-full"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="sports">Sports</option>
                            <option value="home">Home</option>
                        </select>
                    </label>

                    <div>
                        <label className="font-bold">
                            Age:
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="flex gap-10">
                    {additionalThings.map((item) => (
                        <label className="font-bold" key={item.label}>
                            {item.label}
                            <input
                                type="checkbox"
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleInputChange}
                            />
                        </label>
                    ))}
                </div>
                <br />
                <button type="submit">
                    {props.selectedproduct ? "EDIT" : "SUBMIT"}
                </button>
            </form>
        </div>
    );
};

export default ProductDetails;
