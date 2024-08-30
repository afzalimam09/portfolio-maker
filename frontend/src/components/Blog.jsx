import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_BLOGGER_API_KEY;
const BLOG_ID = import.meta.env.VITE_BLOG_ID;

const Blog = () => {
    const [pageToken, setPageToken] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}${
                    pageToken ? `&pageToken=${pageToken}` : ""
                }`
            );
            setBlogs(() => [...blogs, ...data.items]);
            setPageToken(data.nextPageToken);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    console.log(blogs);

    const handleMoreArticle = () => {
        if (!pageToken) return;
        fetchBlogs();
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <article className="blog">
            <header>
                <h2 className="h2 article-title">Blog</h2>
            </header>

            {!loading ? (
                <section className="blog-posts">
                    <ul className="blog-posts-list">
                        {blogs.map((blog) => (
                            <li key={blog.id} className="blog-post-item">
                                <a href={blog.url} target="_blank">
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <time dateTime="2022-02-23">
                                                {blog.updated
                                                    .split("T")[0]
                                                    .split("-")
                                                    .reverse()
                                                    .join("-")}
                                            </time>
                                        </div>

                                        <h3 className="h3 blog-item-title">
                                            {blog.title}
                                        </h3>

                                        <p className="blog-text">{blog.desc}</p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleMoreArticle}
                        href="https://myeduwaves.com"
                        target="_blank"
                        className="blog-more-btn"
                    >
                        {!pageToken ? "That's All" : "Load More"}
                    </button>
                </section>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </article>
    );
};

export default Blog;
