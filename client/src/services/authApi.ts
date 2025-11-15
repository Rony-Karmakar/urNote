import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

type signInDatatype = {
    email: string;
    password: string
}

export async function signIn(data: signInDatatype) {
    const { login } = useAuthStore.getState();
    try {
        const res = await axiosInstance.post('/auth/login', data)
        login(res.data.data.user)
        return res.data;
    } catch (err) {
        console.log("Error in auth callback", err);
    }
}
