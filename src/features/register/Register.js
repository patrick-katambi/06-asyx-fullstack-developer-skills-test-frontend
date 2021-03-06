import React, { useState } from "react";
import { postRequest } from "../../core/helper_functions";
import { urls } from "../../core/urls";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAcess } from "../../app/globalStateSlice";
import { FormField } from "../../components/FormField";

function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChange = (event) => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;

      case "email":
        setEmail(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("both password fields must be filled");
    }

    if (password.length !== 0 && confirmPassword.length !== 0) {

      if (password.length >= 8 || confirmPassword.length >= 8) {
        switch (password === confirmPassword) {
          case true:
            setPasswordError("");
            const response = await postRequest({
              url: urls.user.register,
              data: {
                user_data: {
                  name: username,
                  email: email,
                  password: password,
                  password_confirmation: confirmPassword,
                  user_group_id: 2,
                },
              },
              protected: false,
            });
            const accessToken = response.data.token
            const user_id = response.data.user.id
            console.log({accessToken, user_id})
            dispatch(setUserAcess({accessToken, user_id}))
            navigate("/view")
            break;
  
          case false:
            setPasswordError("both password fields must be equal");
            break;
        }
      } else {
        setPasswordError("both password fields must be greater than or equal to 8");
      }

    }
  };

  return (
    <div className="h-screen w-screen bg-[whitesmoke] flex flex-col items-center justify-center">
      <p className="font-light text-[80px] ">Register</p>
      <div className="w-[500px] rounded-xl shadow-xl p-5 mt-5 ">
        <form onSubmit={handleFormSubmit}>
          <FormField
            type="text"
            placeholder="Your username ..."
            name="username"
            value={username}
            onChange={onChange}
          />
          <br />
          <br />
          <FormField
            type="email"
            placeholder="Your email ..."
            name="email"
            value={email}
            onChange={onChange}
          />
          <br />
          <br />
          <FormField
            type="password"
            placeholder="Your password ..."
            name="password"
            value={password}
            onChange={onChange}
          />
          <br />
          <br />
          <FormField
            type="password"
            placeholder="Your confirmPassword ..."
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
          <br />
          <div className="text-center mt-3 font-bold text-[red]">
            {passwordError}
          </div>
          <br />
          <button
            type="submit"
            className="bg-[#D8AC9C] w-full rounded-lg py-4 font-bold"
          >
            Submit
          </button>
        </form>
      </div>
      <p className="mt-5">
        or you can{" "}
        <span 
        onClick={() => navigate('/login')}
        className="text-lg font-thin underline underline-offset-4 cursor-pointer">
          Login instead
        </span>
      </p>
    </div>
  );
}

export default Register;


