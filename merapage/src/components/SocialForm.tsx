import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SocialFormValidation } from "@/lib/validation";

const SocialForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(SocialFormValidation),
        defaultValues: {
            github: "",
            linkedin: "",
            dribble: "",
            leetcode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SocialFormValidation>) {
        console.log(values);
        setIsLoading(true);
        // const res = await createRequest("/student", values);
        const res = { status: 201 };
        if (res.status === 201) {
            toast({
                title: "Links created successfully!",
            });
            form.reset();
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Github
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="https://github.com/afzalimam09"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    LinkedIn
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="https://linkedin.com/in/afzalimam09"
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
                        name="dribble"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    Dribble
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="shad-input"
                                        placeholder="https://dribble.com/afzalimam09"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="leetcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_lable">
                                    LeetCode
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        placeholder="https://leetcode.com/afzalimam09"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                </div>

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

export default SocialForm;
