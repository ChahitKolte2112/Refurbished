import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../axios/user";
import { loaderAction } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ColumnGroup from "antd/es/table/ColumnGroup";
const rules = [{ required: true, message: "required" }];
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(loaderAction.Setloader(true));
            const response = await RegisterUser(values);
            if (response.success) {
                message.success.apply(response.message);
                console.log(response.data);
                localStorage.setItem("tokenRefurbised", JSON.stringify(response.data));
            } else {
                throw new Error(response.message);
            }
            dispatch(loaderAction.Setloader(false));
            navigate("/login");
        } catch (error) {
            // console.log(error.message);
            message.error(error.message);
        }
    };
    return (
        <div className="h-screen bg-green-100 flex justify-center items-center">
            <div className="w-1/3 bg-white p-2">
                <h3>
                    <span>Refurbise</span>
                </h3>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name:" name="name" rules={rules}>
                        <Input type="text" placeholder="Name"></Input>
                    </Form.Item>
                    <Form.Item label="Email:" name="email" rules={rules}>
                        <Input type="email" placeholder="Email"></Input>
                    </Form.Item>
                    <Form.Item label="Password:" name="password" rules={rules}>
                        <Input type="password" placeholder="password"></Input>
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="mt-2"
                    >
                        Register
                    </Button>
                    <div className="text-center">
                        <span className="text-green-950">
                            Already Have an Account ?
                            <Link to="/login" className="text-green-950">
                                login
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
