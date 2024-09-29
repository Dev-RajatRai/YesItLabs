import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../Contexts/authContext";
import Layout from "../Layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth?.token) {
        const role = parsedAuth?.user?.role;
        navigate(`/dashboard/${role === 2 ? "admin" : "user"}`);
      }
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/login`, { email, password });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(`/dashboard/${res.data.user.role === 2 ? "admin" : "user"}`);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in Logging in");
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <h1>Login Now</h1>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Log In
          </button>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/forget-password")}
            >
              Forget password
            </button>
          </div>
          <Link to={"/signup"}>New User?</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
