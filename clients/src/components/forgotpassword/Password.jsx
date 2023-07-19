import React from "react";
import "./Password.css";

const Password = (props) => {
  return (
    <div className="loginContainer">
      <div className="formContainer">
        <div>
          <h2 className="heading__secondary">Forget Your Password?</h2>
          <p>
            Please enter your email address. We will send you instructions on
            how to reset your password
          </p>
        </div>

        <div className="formInput">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          aria-label=" Submit password"
          className="button"
          title="Submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Password;
