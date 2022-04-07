import React, { useState } from "react";

function Register() {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("both password fields must be filled");
    }

    if (password.length !== 0 && confirmPassword.length !== 0) {
      switch (password === confirmPassword) {
        case true:
          setPasswordError("");
          alert("sending data for login");
          break;

        case false:
          setPasswordError("both password fields must be equal");
          break;
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
      <p className="mt-5">or you can <span className="text-lg font-thin underline underline-offset-4 cursor-pointer">Login instead</span></p>
    </div>
  );
}

export default Register;

function FormField(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className="border-none outline-none w-full py-4 px-5 rounded-lg font-bold"
    />
  );
}
