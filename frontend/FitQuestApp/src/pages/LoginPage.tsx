import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        try {
            await axios.post("http://localhost:8080/api/users/login", data);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A12] text-gray-100 flex flex-col items-center justify-center px-4">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-[#D4AF37] tracking-widest drop-shadow">
                    FITQUEST
                </h1>
                <p className="text-gray-400 mt-2 text-sm">
                    Continue your fitness adventure
                </p>
            </div>

            <div className="bg-[#1A1A24]/90 border border-[#2A2A3A] p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] w-full max-w-md backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            defaultValue=""
                            placeholder="you@example.com"
                            className="w-full bg-[#14141E] border border-[#2A2A3A] text-white rounded-md p-2 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        />
                        {errors.username && (
                            <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            defaultValue=""
                            placeholder="••••••••"
                            className="w-full bg-[#14141E] border border-[#2A2A3A] text-white rounded-md p-2 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#D4AF37] text-black font-semibold py-2 rounded-md hover:brightness-110 transition disabled:opacity-70"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-gray-500 text-sm mt-6 text-center">
                    Don't have an account?{" "}
                    <span
                        className="text-[#D4AF37] cursor-pointer hover:text-yellow-300"
                        onClick={() => navigate("/register")}
                    >
            Register
          </span>
                </p>
            </div>
        </div>
    );
}
