import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import {
    MdOutlineMailOutline,
    MdSmartphone,
    MdOutlineLocationOn,
} from "react-icons/md";
import axios from "axios";
import { getSubdomainAndHost } from "../../utils";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Sidebar = () => {
    const [active, setActive] = useState(false);
    const [userData, setUserData] = useState({});
    const handleActive = () => {
        setActive((prev) => !prev);
    };
    let { username } = getSubdomainAndHost();
    console.log(username);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `${BACKEND_API_URL}/api/v1/users/getuser/${username}`
                );
                console.log("data:-----------", data);
                setUserData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);
    return (
        <aside className={`sidebar ${active ? "active" : ""}`}>
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <img
                        src="/images/profile/photograph.png"
                        alt="Afzal Imam"
                        width="80"
                    />
                </figure>

                <div className="info-content">
                    <h1 className="name" title="Richard hanrick">
                        {userData?.fullName}
                    </h1>

                    <p className="title">FullStack developer</p>
                </div>

                <button onClick={handleActive} className="info_more-btn">
                    <span>Show Contacts</span>
                    <FiChevronDown className="ion-icon" />
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="separator"></div>

                <ul className="contacts-list">
                    <li className="contact-item">
                        <div className="icon-box">
                            <MdOutlineMailOutline />
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Email</p>

                            <a
                                href={`mailto:${userData?.email}`}
                                className="contact-link"
                            >
                                {userData?.email}
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <MdSmartphone />
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Phone</p>

                            <a
                                href={`tel:+${userData.mobile}`}
                                className="contact-link"
                            >
                                {userData?.mobile}
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <MdOutlineLocationOn />
                        </div>

                        <div className="contact-info">
                            <p className="contact-title">Location</p>

                            <address>Bengaluru, Karnatka, India</address>
                        </div>
                    </li>
                </ul>

                <div className="separator"></div>

                <ul className="social-list">
                    <li className="social-item">
                        <a
                            href="https://github.com/afzalimam09"
                            className="social-link"
                        >
                            <BsGithub />
                        </a>
                    </li>

                    <li className="social-item">
                        <a
                            href="https://linkedin.com/in/afzalimam09"
                            className="social-link"
                        >
                            <BsLinkedin />
                        </a>
                    </li>

                    {/* <li className="social-item">
                        <a
                            href="https://twitter.com/afzalimam09"
                            className="social-link"
                        >
                            <BsTwitter />
                        </a>
                    </li> */}
                    <li className="social-item">
                        <a
                            href="https://leetcode.com/afzalimam09"
                            className="social-link"
                        >
                            <SiLeetcode />
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
