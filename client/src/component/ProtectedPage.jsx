import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../axios/user";
import { message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../redux/loaderSlice";

const ProtectedPage = (prop) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logOutHandler = () => {
        localStorage.removeItem("tokenRefurbised");
        navigate("/login");
    };
    const loading = useSelector((state) => state.loaders.loading);

    async function validateToken() {
        try {
            dispatch(loaderAction.Setloader(true));
            console.log(loading);
            // this is not working see it later
            const response = await GetCurrentUser();
            console.log(response);
            dispatch(loaderAction.Setloader(false));
      
            setUser(response.data);

            if (!response.success) {
                navigate("/login");
                message.error(response.message);
            }
        } catch (error) {
            navigate("/login");
            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("tokenRefurbised")) {
            validateToken();
        } else {
            navigate("/login");
            message.error("please login to continue");
        }
    }, []);

    return (
        user && (
            <div className="p-0">
                <div className=" flex justify-between items-center  p-5 w-full bg-green-950 box-border">
                    <span className="text-white">
                        Refu<span className="text-gray-300">rbise</span>
                    </span>
                    <div className="flex bg-white justify-center items-center p-1 mr-3">
                        <i className="ri-account-box-line m-2"></i>
                        <div
                            className="underline cursor-pointer uppercase"
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            {user.name}
                        </div>

                        <i
                            class="ri-logout-box-r-line ml-3 cursor-pointer"
                            onClick={logOutHandler}
                        ></i>
                    </div>
                </div>
                <div>{prop.children}</div>
            </div>
        )
    );
};

export default ProtectedPage;
