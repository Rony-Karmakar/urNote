import { Link } from "react-router-dom"
import SigninFrom from "./components/SigninFrom"

const Signin = () => {
    return (
        <div className='min-h-dvh grid place-items-center p-4'>
            <div className="w-full max-w-sm bg-neutral-300 p-4 rounded-xl">
                <SigninFrom onSubmit={(data) => {
                    console.log(data)
                }} />
                <div className="flex items-center justify-center text-sm pt-2">New to urNote?<Link className="pl-1 text-gray-700 font-bold" to="/signup">sign up</Link></div>
            </div>
        </div>
    )
}

export default Signin