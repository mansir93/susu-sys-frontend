import React, { useState, useEffect } from "react";
import { Card, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { saveToCookie, getCookie } from "../utils/Cookie";
import { useAxios } from "../utils/ApiHook";

const Login = () => {
  const token = getCookie("susu_auth");
  const { data, isLoading, ApiRequest } = useAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    ApiRequest("/auth/signin/", "POST", formData);
  };

  useEffect(() => {
    if (data) {
      saveToCookie("susu_auth", data.token, 5);
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <>
      <section className="mt-20 lg:m-auto gradient-form h-screen w-full bg-gray-300">
        <div className="flex h-full items-center justify-center p-6 ">
          <div className="flex flex-col bg-transparent bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="mb-12">
              <div className="flex justify-start items-start p-8">
                <h3 className="font-bold text-gray-700 text-xl">SUSU-BANK</h3>
              </div>
              <Card
                color="transparent"
                shadow={false}
                className="px-16 py-4 text-center"
              >
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4 flex flex-col">
                    <div className="mb-6">
                      <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder="john@example.com"
                        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        type="password"
                        required
                        placeholder="  ********* "
                        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                    fullWidth
                  >
                    Login
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
