import { Link } from "react-router-dom"


const Navbar = () => {
    return (
        <div className="flex justify-between items-center px-4 ">
            <div className="text-zinc-800 font-bold font-poppins">UrNote</div>
            <Link className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800" to={'/signin'}>Sign In</Link>
        </div>
    )
}

export default Navbar