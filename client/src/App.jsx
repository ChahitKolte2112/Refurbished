import { Button } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import ProtectedPage from "./component/ProtectedPage";
import Spinner from "./component/Spinner";
import { useSelector } from "react-redux";
import Profile from "./page/Profile";
// import Profile from "./page/Profile";

function App() {
    const loading = useSelector((state) => state.loaders.loading);
    return (
        <div>
            {loading && <Spinner />}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedPage>
                                <Home />
                            </ProtectedPage>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedPage>
                                <Profile />
                            </ProtectedPage>
                        }
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
