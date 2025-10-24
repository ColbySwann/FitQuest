import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AccountPage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({username: "", email: "", password: ""});
    const navigate = useNavigate();

    const username = localStorage.getItem("username");


    useEffect(() => {
        if (!username){
            navigate("/login");
            return;
        }

        axios.get(`http://localhost:8080/api/users/username/${username}`)
            .then(res => {
                console.log("axios" , res.data);
            setForm({
                    username: res.data.username,
                    email: res.data.email,
                    password: "",
                });
            setUser(res.data);


        })
            .catch((err) => {
            console.error("Error fetching user:", err);
        });


    }, [username, navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleUpdate = async () => {
        try{
            const payload: any = {
                username: form.username,
                email: form.email,
            };

            if (form.password && form.password.trim().length > 0) {
                payload .password = form.password;
            }

            await axios.put(`http://localhost:8080/api/users/${user.id}`, payload);
            alert("Account Updated");
            setIsEditing(false);
        }catch (err) {
            console.error(err);
            alert("Failed to update the account");
        }

    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete your account?")) {
            try {
                await axios.delete(`http://localhost:8080/api/users/softdelete/${user.id}`);
                alert("Account deleted!");
                localStorage.clear();
                navigate("/");
            } catch (error) {
                console.error(error);
                alert("Failed to delete account.");
            }
        }
    };

    if (!user) return <div className={"text-center text-gray-400"}>Loading...</div>;

    return(
        <div className="h-fit flex justify-center bg-[#0A0A12] text-gray-100">
            <div className="bg-[#1A1A24] p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 text-center">Account Info</h2>

                {["username", "email", "password"].map(field => (
                    <div key={field} className="mb-4">
                        <label htmlFor={field} className="block mb-1 capitalize">{field}</label>
                        <input
                            id={field}
                            type={field === "password" ? "password" : "text"}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2 rounded bg-[#14141E] border border-[#2A2A3A] text-white ${
                                isEditing ? "focus:ring-2 focus:ring-[#D4AF37]" : "opacity-70"
                            }`}
                        />
                    </div>
                ))}

                <div className="flex justify-between">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-[#D4AF37] text-black px-4 py-2 rounded hover:brightness-110"
                        >
                            Edit Account
                        </button>
                    ) : (
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AccountPage