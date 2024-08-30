import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
    MdOutlineMailOutline,
    MdOutlineWhatsapp,
    MdOutlineCall,
} from "react-icons/md";

const notyf = (message, type) => {
    if (type === "success") {
        toast.success(message, {
            duration: 5000,
            position: "top-right",
        });
    } else {
        toast.error(message, {
            duration: 5000,
            position: "top-right",
        });
    }
};

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const handleSendEmail = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const { name, email, text } = Object.fromEntries(formData);
        if (!email || !name || !text)
            return notyf("All fields are required!", "error");
        try {
            setLoading(true);
            await axios.post(
                "https://kist-6ofr.onrender.com/api/v1/email/send-contact-email",
                { name, email, text }
            );
            notyf("Message Sent Successfully!", "success");

            setTimeout(() => {
                notyf(`We'll contact you soon!`, "success");
            }, 1000);
            formRef.current.reset();
        } catch (error) {
            notyf("Something went wrong. Please try Again!", "error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <article className="contact">
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section>
                <ul className="contact-options">
                    <li>
                        <a
                            href="mailto:afzalimam09@gmail.com"
                            className="icon-box"
                            target="_blank"
                        >
                            <MdOutlineMailOutline />
                        </a>
                        <p>Mail</p>
                    </li>
                    <li>
                        <a
                            href="https://api.whatsapp.com/send?phone=916206864101"
                            className="icon-box"
                            target="_blank"
                        >
                            <MdOutlineWhatsapp />
                        </a>
                        <p>Chat</p>
                    </li>
                    <li>
                        <a
                            href="tel:+916206864101"
                            className="icon-box"
                            target="_blank"
                        >
                            <MdOutlineCall />
                        </a>
                        <p>Call</p>
                    </li>
                </ul>
            </section>

            <section className="contact-form">
                <h3 className="h3 form-title">Contact Form</h3>

                <form className="form" ref={formRef} onSubmit={handleSendEmail}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Full name"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <textarea
                        name="text"
                        className="form-input"
                        placeholder="Your Message"
                        required
                    ></textarea>

                    <button className="form-btn" type="submit">
                        <FaPaperPlane />
                        <span>{!loading ? "Send Message" : "Sending ..."}</span>
                    </button>
                </form>
            </section>
            <Toaster />
        </article>
    );
};

export default Contact;
