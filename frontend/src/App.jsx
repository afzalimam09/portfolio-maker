import Sidebar from "./components/shared/Sidebar";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Resume from "./components/Resume";
import Portfolio from "./components/Protfolio";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import "./App.css";
import SingleProject from "./components/SingleProject";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "./context/AccountProvider";

const App = () => {
    const { loading } = useContext(AccountContext);

    if (loading) {
        return (
            <div style={{ color: "white", textAlign: "center" }}>
                Loading...
            </div>
        );
    }
    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/project/:projectSlug"
                        element={<SingleProject />}
                    />
                </Routes>
            </div>
        </main>
    );
};

export default App;
