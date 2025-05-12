import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/authLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import apiService from "../../utils/apiServices";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle login form submit.
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");
    //Login Api Call Goes here

    try {
      const response = await apiService.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        //redirect based on role
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };
  return (
    <>
      <div className="w-full h-screen mt-10 md:mt-0 flex flex-col items-center justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-state-700 mt-[5px] mb-6">
          Please login to your account
        </p>
        {/* </div> */}
        {/* <div className="flex w-full h-screen align-center justify-center px-12 pb-12"> */}
        <form className="lg:w-[30%] md:w-[50%] lg:h-[50%]" onSubmit={handleLoginSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Vikram@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Pass@123"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className=" font-medium text-blue-600 underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
