import { Link } from "react-router-dom"
import SignUpForm from "./components/SignUpForm"

const Signup = () => {
    return (
        <div className='min-h-dvh grid place-items-center p-4'>
            <div className="w-full max-w-sm bg-neutral-300 p-4 rounded-xl">
                <SignUpForm onSubmit={(data) => {
                    console.log(data)
                }} />
                <div className="flex items-center justify-center text-sm pt-2">Already have account?<Link className="pl-1 text-gray-700 font-bold" to="/signin">sign in</Link></div>
            </div>
        </div>
    )
}

export default Signup