import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

export default function RegistrationPage() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        setLoading(true);
        console.log(data);
        try {
            await axios.post("http://localhost:8080/api/users", data);
            alert("Registration successful!");
            reset();
        } catch (err) {
            // @ts-ignore
            alert("Registration failed: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A12] text-gray-100 flex flex-col items-center justify-center px-4">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-[#D4AF37] tracking-widest drop-shadow">
                    FITQUEST
                </h1>
                <p className="text-gray-400 mt-2 text-sm">Register to begin your fitness adventure</p>
            </div>

            <div className="bg-[#1A1A24]/90 border border-[#2A2A3A] p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.6)] w-full max-w-md backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                        <input
                            id="username"
                            {...register("username")}
                            defaultValue=""
                            className="w-full bg-[#14141E] border border-[#2A2A3A] text-white rounded-md p-2 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            defaultValue=""
                            className="w-full bg-[#14141E] border border-[#2A2A3A] text-white rounded-md p-2 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            defaultValue=""
                            className="w-full bg-[#14141E] border border-[#2A2A3A] text-white rounded-md p-2 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-[#D4AF37] text-black font-semibold py-2 rounded-md hover:brightness-110 transition disabled:opacity-70">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
