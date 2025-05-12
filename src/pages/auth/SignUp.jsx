import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/authLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link, Navigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import apiService from "../../utils/apiServices";
import { UserContext } from "../../context/userContext";
import uploadeImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);

  // const handleSignupSubmit = async (e) => {
  //   e.preventDefault();
  //   let profileImageUrl = '';
  //   // setError("");
  //   if (!fullName) {
  //     setError("Please enter name");
  //     return;
  //   }
  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }
  //   if (!password) {
  //     setError("Please enter the password.");
  //     return;
  //   }

  //   // if (password !== confirmPassword) {
  //   //   setError("Passwords do not match.");
  //   //   return;
  //   // }
  //   setError("");

  //   //Sign up Api Call Goes here

  //   try {

  //     // Upload image if present
  //     if (profileImage) {
  //       const response = await uploadeImage(profileImage);
  //       profileImageUrl = response.imageUrl || "";
  //     }
  //     const response = await apiService.post(API_PATHS.AUTH.REGISTER, {
  //       name: fullName,
  //       email,
  //       password,
  //       profileImageUrl,
  //       adminInviteToken,
  //     });

  //     const { token, role } = response.data;
  //     if (token) {
  //       localStorage.setItem("token", token);
  //       updateUser(response.data);

  //       //redirect based on role
  //       Navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data.message) {
  //       setError(error.response.data.message);
  //     } else {
  //       setError("Something went wrong.");
  //     }
  //   }
  // };


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!fullName) {
      setError("Please enter name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
  
    let profileImageUrl = "";
  
    try {
      // Upload image if selected
      if (profileImage) {
        const uploadResponse = await uploadeImage(profileImage);
        if (!uploadResponse || !uploadResponse.imageUrl) {
          setError("Failed to upload image. Please try again.");
          return;
        }
        profileImageUrl = uploadResponse.imageUrl;
      }
  
      const response = await apiService.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });
  
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        // redirect
        window.location.href = role === "admin" ? "/admin/dashboard" : "/user/dashboard";
      } else {
        setError("Unexpected response. Please try again.");
      }
  
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };
  
  return (
    <>
      <div className="w-full h-screen mt-10 md:mt-0 flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-state-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignupSubmit}>
          <ProfilePhotoSelector
            image={profileImage}
            setImage={setProfileImage}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Vikram Panchal"
              type="text"
            />

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
            {/* <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Pass@123"
              type="password"
            /> */}

            <Input
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account? {""}
            <Link className=" font-medium text-blue-600 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
