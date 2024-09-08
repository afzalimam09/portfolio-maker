import * as z from 'zod';

export const ProfileValidation = z.object({
    fullName: z.string().min(4, { message: "Minimum 4 characters long." }),
    role: z.string().min(4, { message: "Minimum 4 characters long." }),
    email: z.string().email({ message: 'Please enter a valid email!' }),
    mobile: z.string().min(10, { message: 'Invalid phone number' }).max(10, { message: 'Invalid phone number' }),
    city: z.string().min(4, { message: "Minimum 4 characters long." }),
    state: z.string().min(4, { message: "Minimum 4 characters long." }),
    country: z.string().min(4, { message: "Minimum 4 characters long." }),
    profilePhoto: z.custom<File[]>(),
    resume: z.custom<File[]>(),
    about: z.string().min(120, { message: "Minimum 120 chracters" })
});

export const SocialFormValidation = z.object({
    github: z.string().url({ message: "Please enter a valid url" }).optional(),
    linkedin: z.string().url({ message: "Please enter a valid url" }).optional(),
    dribble: z.string().url({ message: "Please enter a valid url" }).optional(),
    leetcode: z.string().url({ message: "Please enter a valid url" }).optional(),
});

export const AboutFormValidation = z.object({
    resume: z.custom<File[]>(),
    about: z.string().min(120, { message: "Minimum 120 character" }),
});