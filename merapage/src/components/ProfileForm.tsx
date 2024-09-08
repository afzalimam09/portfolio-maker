import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ProfileUploader from "./ProfileUploader";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProfileValidation } from "@/lib/validation";
import { apiRequest } from "@/requestMethods";
import { Textarea } from "./ui/textarea";

const ProfileForm = () => {
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploaderReset, setUploaderReset] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);

    const getUserProfile = async () => {
        try {
            setLoading(true);
            const res = await apiRequest.get("/users/me");
            form.reset({
                profilePhoto: [],
                fullName: res.data.data.fullName || "",
                role: res.data.data.role || "",
                mobile: res.data.data.mobile?.toString() || "",
                email: res.data.data.email || "",
                city: res.data.data.city || "",
                state: res.data.data.state || "",
                country: res.data.data.country || "",
                resume: [],
                about: res.data.data.about || "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [updateFlag]);

    const form = useForm({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            profilePhoto: [],
            fullName: "",
            role: "",
            mobile: "",
            email: "",
            city: "",
            state: "",
            country: "",
            resume: [],
            about: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ProfileValidation>) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (key === "profilePhoto") {
                formData.append(key, values.profilePhoto[0]);
            } else {
                formData.append(key, (values as any)[key]);
            }
        });

        try {
            setIsLoading(true);
            await apiRequest.patch("/users/updateme", values);
            toast({
                title: "Updated successfully!",
            });
            form.reset();
            setUploaderReset((prev) => !prev);
            setUpdateFlag((prev) => !prev);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="profilePhoto"
                    render={({ field }) => (
                        <FormItem className="flex">
                            <FormControl>
                                <ProfileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={""}
                                    uploaderReset={uploaderReset}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Full Name *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="John Doe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Role *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="Fullstack Developer"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Email *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="contact@merapage.xyz"
                                        disabled={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Phone Number *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="shad-input"
                                        placeholder="6543895416"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    City *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        placeholder="Bengaluru"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    State *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        placeholder="Karnatka"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Country *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        placeholder="India"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_lable">
                                Description *
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea"
                                    placeholder="Write description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_lable">
                                Resume
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="shad-file"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {!isLoading ? (
                    <Button
                        type="submit"
                        className="rounded bg-dark-4 px-6 float-end"
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        className="bg-dark-4 float-end rounded px-6"
                        disabled
                    >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
            </form>
        </Form>
    );
};

export default ProfileForm;
