import {Link} from "react-router-dom";

export function LoginButton(){
    return(
        <nav className={"absolute top-4 right-4 z-[9999]"}
        >
            <Link to="/login" className={"bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-md shadow hover:brightness-110 transition"}>
                Login
            </Link>
            <Link to="/register" className={"bg-[#D4AF37] text-black font-semibold px-4 py-2 rounded-md shadow hover:brightness-110 transition"}>
                Register
            </Link>
        </nav>
    )
}
