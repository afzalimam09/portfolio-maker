import ProfileForm from "@/components/ProfileForm";
import SocialForm from "@/components/SocialForm";

const About = () => {
    return (
        <section className="flex size-full flex-col gap-6 text-white">
            <h1 className="text-2xl font-bold">Profile</h1>
            <ProfileForm />
            <h1 className="text-2xl font-bold">Social Links</h1>
            <SocialForm />
        </section>
    );
};

export default About;
