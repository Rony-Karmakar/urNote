import { axiosInstance } from "@/lib/axios";

type signInDatatype = {
    email: string;
    password: string
}

export async function signIn(data: signInDatatype) {

    try {
        const res = await axiosInstance.post('/auth/login', data)
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log("Error in auth callback", err);
    }
}
