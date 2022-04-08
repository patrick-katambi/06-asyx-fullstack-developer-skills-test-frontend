import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAcess } from "../../app/globalStateSlice";
import { FormField } from "../../components/FormField";
import { postRequest } from "../../core/helper_functions";
import { urls } from "../../core/urls";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password.length === 0) setPasswordError("Password must be filled");

    if (password.length >= 8) {
      const response = await postRequest({
        url: urls.user.login,
        data: { user_data: { email: email, password: password } },
        protected: false,
      });

      if (response.message === "SUCCESS") {
        const accessToken = response.data.token;
        const user_id = response.data.user.id;
        console.log({accessToken, user_id})
        dispatch(setUserAcess({ accessToken, user_id }));
        navigate("/view");
        return;
      }
      if (response.message === "FAILED") {
        setEmail("");
        setPassword("");
        setPasswordError("");
        alert("login failed");
        return;
      }
      alert("sonething went wrong");
    }
  };

  return (
    <div className="h-screen w-screen bg-[whitesmoke] flex flex-col items-center justify-center">
      <p className="font-light text-[80px] ">Login</p>
      <div className="w-[500px] rounded-xl shadow-xl p-5 mt-5 ">
        <form onSubmit={handleFormSubmit}>
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
          onClick={() => navigate("/")}
          className="text-lg font-thin underline underline-offset-4 cursor-pointer"
        >
          Register instead
        </span>
      </p>
    </div>
  );
}

export default Login;
