import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="h-[calc(100vh-72px) flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Create Your Professional Portfolio
                    </h1>
                    <p className="text-lg text-gray-400 mb-8">
                        Build and showcase your projects, skills, and
                        experiences with our easy-to-use platform.
                    </p>
                    <Link
                        to="/dashboard"
                        className="bg-blue-500 font-bold text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Get Started
                    </Link>
                    <div className="flex justify-center mt-8">
                        <img
                            src="/images/home-page2.png"
                            className="w-[77%] rounded-t-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
