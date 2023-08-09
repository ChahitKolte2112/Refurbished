import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../axios/user";
import { useDispatch } from "react-redux";
import { loaderAction } from "../redux/loaderSlice";
const rules = [{ required: true, message: "required" }];
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(loaderAction.Setloader(true));
            const response = await LoginUser(values);

            if (response.success) {
            
                message.success(response.message);
                localStorage.setItem("tokenRefurbised", JSON.stringify(response.data));
                navigate("/");
            } else {
                throw new Error(response.message);
            }
            dispatch(loaderAction.Setloader(false));
        } catch (error) {
            message.error(error.message);
        }
    };
    return (
        <div className="h-screen  bg-green-100 flex justify-center items-center">
            <div className=" w-1/3 bg-white p-2">
                <h3>
                    <span className="text-green-950">Refurbise</span>
                </h3>
                <Form layout="vertical" onFinish={onFinish}>
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
                        Login
                    </Button>
                    <div className="text-center">
                        <span className="text-green-950">
                            Don't Have an Account ?
                            <Link to="/signup" className="text-green-950">
                                Signup
                            </Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
