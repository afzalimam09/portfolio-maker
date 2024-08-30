import { BiArrowBack } from "react-icons/bi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { portfolio } from "../constants";

const SingleProject = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const projectId = pathname.split("/")[2].split("-")[0];
    const project = portfolio[projectId - 1];

    return (
        <article className="single">
            <header>
                <button
                    onClick={() => navigate(-1)}
                    className="h2 article-title"
                >
                    <BiArrowBack />
                </button>
                <h3 className="h3">{project.name}</h3>
            </header>
            <section>
                <h3 className="h3">{project.title}</h3>
                <ul className="testimonials-list has-scrollbar">
                    {project.images.map((item, index) => (
                        <li key={index} className="testimonials-item">
                            <figure className="project-img">
                                <img src={item} alt={project.title} />
                            </figure>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="desc">
                <p>{project.firstPara}</p>
                <h4 className="h4">Key Features</h4>
                {project.features.map((item) => (
                    <p key={item.id}>
                        <b>{item.title}:</b> {item.desc}
                    </p>
                ))}
                <p>{project.lastPara}</p>
            </section>
            <section>
                <h4 className="h4">Tech Stacks</h4>
                <div className="techstack-list">
                    {project.techstacks.map((item, index) => (
                        <p className="techstack" key={index}>
                            {item}
                        </p>
                    ))}
                </div>
            </section>
            <section>
                <h4 className="h4">Deployed Links</h4>
                <div className="deployed-links">
                    {project.github && (
                        <a href={project.github} target="_blank">
                            Github
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank">
                            Live Demo
                        </a>
                    )}
                    {project.api && (
                        <a href={project.api} target="_blank">
                            API Documentation
                        </a>
                    )}
                </div>
            </section>
        </article>
    );
};

export default SingleProject;
