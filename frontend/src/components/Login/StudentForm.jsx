import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../UI/Spinner";

function StudentLogin() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      setSpinner(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/`, {
        username: formData.username,
        password: formData.password,
      });

      console.log(response);
      console.log(formData.username);
      
      const { token } = response.access;
      const name = "user";
      localStorage.setItem("Student jwtToken", token);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("Student Name", name);
      navigate(`/student/dashboard`);
      toast.success("Logged in");
    } catch (error) {
      setSpinner(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Login failed");
      }
    }
  }

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <section className="bg-gray-100 dark:bg-slate-900 min-h-screen flex items-center justify-center p-8 w-full">
          <div className="bg-white rounded-lg dark:bg-slate-800 dark:text-white dark:border-gray-200 dark:border shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col  items-center">
              <h2 className="font-bold text-2xl">Student Login</h2>
              <p className="text-sm mt-4 dark:text-gray-300">If you are already a member, easy login</p>
              <form className="flex flex-col  gap-3 mt-4 w-full dark:bg-slate-800" onSubmit={submitHandler}>
                <label >Username: </label>
                <input
                  className="mt-3 p-2 border rounded dark:bg-slate-700"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  placeholder="Username"
                />
                  <label >Password:</label>
                <input
                  className="mt-3 p-2 border rounded dark:bg-slate-700"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
                />

                <div className="flex mt-4 gap-3 w-full">
                  <input
                    type="submit"
                    value="Login"
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full"
                  />
                  <Link to="/student/signup" className="w-full">
                    <button className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full">
                      Register
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default StudentLogin;
