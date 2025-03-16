import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login (nanti ganti dengan API)
    if (email === "test@user.com" && password === "password123") {
      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <label className="mb-1 font-medium">Email:</label>
      <input
        type="email"
        className="p-2 border rounded-md mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="mb-1 font-medium">Password:</label>
      <input
        type="password"
        className="p-2 border rounded-md mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
