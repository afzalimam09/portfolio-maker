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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "@/requestMethods";
import { useToast } from "@/hooks/use-toast";

const registerSchema = z
    .object({
        fullName: z.string().min(4, { message: "Minimum 4 characters" }),
        email: z.string().email({ message: "Enter a valid email" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        passwordConfirm: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords do not match",
    });

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        console.log(values);
        setLoading(true);
        try {
            await apiRequest.post("/auth/signup", values);
            navigate("/login");
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            toast({
                title: error?.response?.data?.message,
            });
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-dark-1 p-5 sm:p-8 rounded-lg shadow-lg w-full max-w-md mt-5">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <p className="text-gray-400 mb-6 text-base">
                    Enter account details to register
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
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
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="shad-form_message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_lable">
                                        Password *
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="shad-input"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password..."
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="shad-form_message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_lable">
                                        Password Confirm *
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="shad-input"
                                                type={
                                                    showPasswordConfirm
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password again..."
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                                onClick={() =>
                                                    setShowPasswordConfirm(
                                                        !showPasswordConfirm
                                                    )
                                                }
                                            >
                                                {showPasswordConfirm ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="shad-form_message" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-1 text-white hover:bg-blue-500"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </div>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-between items-center mt-4">
                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-gray-400 hover:text-sky-1"
                    >
                        Forgot password?
                    </Link>
                    <Link
                        to="/login"
                        className="text-sm font-medium text-gray-400 hover:text-sky-1"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
