import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./pages/_root/RootLayout";
import Home from "./pages/_root/Home";
import Login from "./pages/_root/Login";
import Register from "./pages/_root/Register";
import DashboardLayout from "./pages/_dashboard/DashboardLayout";
import About from "./pages/_dashboard/About";
import DashboardHome from "./pages/_dashboard/DashboardHome";
import Experience from "./pages/_dashboard/Experience";
import Education from "./pages/_dashboard/Education";
import Skills from "./pages/_dashboard/Skills";
import Project from "./pages/_dashboard/Project";
import Blog from "./pages/_dashboard/Blog";
import { useContext } from "react";
import { AccountContext } from "./context/AccountProvider";

function App() {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("AccountContext is not available");
    }
    const { account } = context;

    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route
                    path="login"
                    element={!account ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="register"
                    element={!account ? <Register /> : <Navigate to="/" />}
                />
            </Route>

            <Route
                path="/dashboard"
                element={
                    account ? <DashboardLayout /> : <Navigate to="/login" />
                }
            >
                <Route index element={<DashboardHome />} />
                <Route path="about" element={<About />} />
                <Route path="experience" element={<Experience />} />
                <Route path="education" element={<Education />} />
                <Route path="skills" element={<Skills />} />
                <Route path="project" element={<Project />} />
                <Route path="blog" element={<Blog />} />
            </Route>
        </Routes>
    );
}

export default App;
