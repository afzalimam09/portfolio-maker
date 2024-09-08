import { useContext, useEffect } from "react";
import { serviceList } from "../constants";
import { AccountContext } from "../context/AccountProvider";

const About = () => {
    const { account } = useContext(AccountContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="about">
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>

            <section className="about-text">
                <p>{account?.about}</p>
                <a href="/afzal-resume.pdf" className="download-resume">
                    Download Resume
                </a>
            </section>

            <section className="service">
                <h3 className="h3 service-title">What i'm doing</h3>

                <ul className="service-list">
                    {serviceList.map((item) => (
                        <li key={item.id} className="service-item">
                            <div className="service-icon-box">
                                <img
                                    src={item.image}
                                    alt="Web development icon"
                                    width="40"
                                />
                            </div>

                            <div className="service-content-box">
                                <h4 className="h4 service-item-title">
                                    {item.title}
                                </h4>

                                <p className="service-item-text">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default About;
