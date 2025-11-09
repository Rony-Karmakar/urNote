// src/features/auth/components/SignUpForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpSchema = z.object({
    name: z.string().min(2, "Too short"),
    email: z.string().email(),
    password: z.string().min(6),
});
type SignUpInput = z.infer<typeof SignUpSchema>;

export default function SignUpForm({ onSubmit }: { onSubmit?: (d: SignUpInput) => void }) {
    const form = useForm<SignUpInput>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => onSubmit?.(d))} className="space-y-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="password" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit" className="w-full">Create account</Button>
            </form>
        </Form>
    );
}
