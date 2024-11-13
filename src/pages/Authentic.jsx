import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import learnum from "../assets/images/LearnUm.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { loginApi, registerApi } from "../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Authentic({ register }) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;

    if (!username || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const result = await registerApi(userDetails);
      console.log(result);
      setSuccessMessage("Registration successful!");
      setError("");
      navigate('/login')
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  //login

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userDetails;

    if (!email || !password) {
      setError("Please fill all the fields");
    }
    else {
      const result = await loginApi({ email, password });
      console.log(result.data);

      if (result.status == 200) {
        toast.info("Login successfull");
        sessionStorage.setItem("exsistingUser" , JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        // sessionStorage.setItem("role",result.data.role)
        setUserDetails(
          {
            username: "",
            email: "",
            password: "",
          }
        )
       setTimeout(
        ()=>{
          navigate('/')
        },2000
       )

      } else {
        toast.error('Something went wrong..Please try again');
      }
    }
  };

  return (
    <>
      <div className="backetohome mt-5 text-center text-cyan-900">
        <Link to="/">
          <button aria-label="Back to Home">
            Back to Home <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md flex-1 flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-blue-200 rounded-xl p-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="LearnUm"
                src={learnum}
                className="mx-auto h-28 w-auto rounded-full"
              />
              {!register ? (
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              ) : (
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Register Please
                </h2>
              )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6 rounded-lg shadow-md">
              <form className="space-y-6" onSubmit={handleRegister}>
                {register && (
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      User Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        autoComplete="username"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && (
                  <p className="text-green-500 text-center">{successMessage}</p>
                )}

                {register ? (
                  <div>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleRegister}
                    >
                      Register
                    </button>

                    <p className="mt-10 text-center text-sm text-gray-500">
                      Already a member? Please{" "}
                      <Link
                        to="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleLogin}
                    >
                      Log in
                    </button>

                    <p className="mt-10 text-center text-sm text-gray-500">
                      Not a member? Please{" "}
                      <Link
                        to="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Authentic;
