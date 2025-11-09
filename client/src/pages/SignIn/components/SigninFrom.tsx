import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInSchema = z.object({
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, "Min 6 characters")
})
type SignInInput = z.infer<typeof SignInSchema>;

const SigninFrom = ({ onSubmit }: { onSubmit?: (d: SignInInput) => void }) => {

    const form = useForm<SignInInput>({
        resolver: zodResolver(SignInSchema),
        defaultValues: { email: "", password: "" }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit?.(data))} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Sign in</Button>
            </form>
        </Form>
    )
}

export default SigninFrom