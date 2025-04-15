import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message);
        return;
      }
  
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/home");
    } catch (error) {
      console.error("Login request failed:", error);
      alert("Network error! Check console.");
    }
  };
  
  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.ytimg.com/vi/kyWiZlrS9mA/maxresdefault.jpg')`,
      }}
    >
      {/* Welcome Heading */}
      <h1 className="text-5xl font-bold text-white mb-6">Welcome to College Connect</h1>

      {/* Short Description (Smaller & Centered Above Login Box) */}
      <p className="text-white text-lg bg-black bg-opacity-60 px-6 py-2 rounded-lg mb-4">
        Connect with students & alumni to build your professional network.
      </p>

      {/* Main Content: Login + Image */}
      <div className="flex w-4/5 max-w-6xl h-[70vh] gap-x-10">
        {/* Left Side - Login Form */}
        <div className="w-1/3 flex flex-col justify-center bg-black bg-opacity-90 p-6 rounded-3xl shadow-lg mt-10 mb-10">
          <h2 className="text-2xl font-semibold text-white mb-6">Login to Your Account</h2>
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <input
              required
              className="border border-gray-600 mb-3 text-white bg-transparent rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <input
              required
              className="border border-gray-600 mb-3 text-white bg-transparent rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={handleLogin}
              className="mt-4 text-lg text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg py-2 transition-all"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Side - Larger Image */}
        <div className="w-2/3 flex justify-center items-center">
          <img
            src="https://png.pngtree.com/png-vector/20230728/ourlarge/pngtree-connection-clipart-flat-illustration-of-people-networking-together-vector-illustration-ilustratura-png-image_6805393.png"
            alt="Networking"
            className="w-[90%] h-[100%] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;







