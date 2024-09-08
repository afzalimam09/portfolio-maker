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
} from "@/components/ui/form";
import { apiRequest } from "@/requestMethods";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const usernameSchema = z.object({
    username: z.string().min(1, { message: "Please enter your username" }),
});

const DashboardHome = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [updateFlag, setUpdateFlag] = useState(false);

    const getUserProfile = async () => {
        try {
            setPageLoading(true);
            const res = await apiRequest.get("/users/me");
            form.reset({
                username: res.data.data.username || "",
            });
            if (res.data.data?.username) {
                setUsername(res.data.data.username);
            } else {
                setEditing(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPageLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [updateFlag]);

    const handleCopy = () => {
        const url = `https://${username}.afzalimam.me`;
        navigator.clipboard
            .writeText(url)
            .then(() => {
                console.log("Text copied to clipboard");
                alert("Url copied!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    const form = useForm<z.infer<typeof usernameSchema>>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof usernameSchema>) => {
        try {
            setLoading(true);
            console.log(values);
            await apiRequest.patch("/users/updateme", values);
            setUpdateFlag((prev) => !prev);
            setEditing(false);
        } catch (error: any) {
            console.log(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    if (pageLoading) {
        return (
            <section className="flex size-full flex-col gap-6 text-white">
                <h1 className="text-2xl font-bold">Please wait...</h1>
            </section>
        );
    }

    return (
        <section className="flex size-full flex-col gap-6 text-white">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {editing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_lable">
                                        Website URL *
                                    </FormLabel>
                                    <FormControl>
                                        <div className="shad-input flex w-full items-center rounded-md">
                                            <span className="px-2 text-gray-300">
                                                https://
                                            </span>
                                            <Input
                                                className="shad-input"
                                                {...field}
                                                placeholder="username"
                                            />
                                            <span className="px-2 text-gray-300 ">
                                                .afzalimam.me
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="shad-form_message" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="bg-blue-1 text-white hover:bg-blue-500"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </div>
                            ) : (
                                "Save"
                            )}
                        </Button>
                        {username && (
                            <Button
                                onClick={() => setEditing(false)}
                                className="bg-red-500 text-white hover:bg-red-400 ml-2"
                            >
                                Cancel
                            </Button>
                        )}
                    </form>
                </Form>
            ) : (
                <div>
                    <h2 className="text-xl font-bold">
                        Your portfolio is live now:{" "}
                        <Link
                            target="_blank"
                            to={`https://${username}.afzalimam.me`}
                            className="text-red-300"
                        >
                            {`https://${username}.afzalimam.me`}
                        </Link>
                    </h2>
                    <div className="flex gap-2 mt-4">
                        <Button
                            onClick={handleCopy}
                            className="bg-blue-1 text-white hover:bg-blue-500"
                        >
                            Copy
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => setEditing(true)}
                            className="bg-blue-1 text-white hover:bg-blue-500"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DashboardHome;
