import { useEffect } from "react";
import { serviceList } from "../constants";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="about">
            <header>
                <h2 className="h2 article-title">About me</h2>
            </header>

            <section className="about-text">
                <p>
                    I'm Full Stack Web Developer from Bengaluru, Karnatka,
                    India, completed B-Tech in Computer Science from KIST
                    College, Bhubaneshwar, Odisha in 2023.
                </p>

                <p>
                    I have completed several courses and projects related to web
                    development, including building a RESTful API. I am skilled
                    in Node.js, MongoDB, and MySQL, and have experience with
                    frontend technologies such as React, Redux, and Next.js.
                    Through these experiences, I have developed a strong
                    foundation in programming languages such as JavaScript,
                    Java, HTML, and CSS, as well as experience in creating
                    scalable and maintainable code.
                </p>
                <p>
                    In addition to my technical skills, I possess excellent
                    communication skills and enjoy working collaboratively with
                    others to achieve common goals. I am highly motivated,
                    detail-oriented, and possess a strong work ethic.
                </p>
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
