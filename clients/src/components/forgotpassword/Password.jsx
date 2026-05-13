import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./Password.css";
import { requestPasswordResetLocal } from "../../utility/localDb";

const Password = (props) => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      toast("Please enter your email.");
      return;
    }
    const response = requestPasswordResetLocal(email);
    toast(response.message);
  };

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

        <form onSubmit={submitHandler}>
          <div className="formInput">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default Password;
