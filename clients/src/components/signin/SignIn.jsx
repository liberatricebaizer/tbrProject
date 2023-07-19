import "./SignIn.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loginRedux } from "../../redux/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(data);
  const userData = useSelector((state) => state);
  console.log(userData.user);

  const dispatch = useDispatch();

  const enteredEmailIsValid = data.email.includes("@");
  const emailIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = data.password.trim() !== "";
  const enteredPasswordIsInValid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const passwordBlurHandler = (e) => {
    setEnteredPasswordTouched(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMIN);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/signin`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();

      // alert(dataRes.message);
      toast(dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log(userData);
    } else {
      alert("Please Enter required fields");
    }

    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
  };

  const emailClasses = emailIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const passwordClasses = enteredPasswordIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  return (
    <Fragment>
      <div className="form_box">
        <div className="login-box">
          <div className="img"></div>

          <div className="login-form">
            <form action="#" onSubmit={handleSubmit}>
              <div className="logo">
                <h2>TBR Agency</h2>
              </div>

              <div className={emailClasses}>
                <input
                  type={"email"}
                  id="email"
                  name="email"
                  placeholder="Email address"
                  onChange={handleOnChange}
                  onBlur={emailBlurHandler}
                  value={data.email}
                />
                {emailIsInValid && <p>Email must not be empty.</p>}
              </div>

              <div>
                <div
                  className={passwordClasses}
                  style={{
                    display: "flex",
                    border: "solid 1px #0ca678",
                    borderRadius: "3px",
                    alignItems: "center",
                    paddingRight: "3px",
                  }}
                >
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleOnChange}
                    onBlur={passwordBlurHandler}
                    value={data.password}
                    style={{ border: "none", outline: "none" }}
                  />
                  <span
                    style={{
                      display: "flex",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>
                {enteredPasswordIsInValid && <p>password must not be empty.</p>}
              </div>

              <div className="sub_capt">
                <div className="check">
                  <input type="checkbox" id="remember" required />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <div className="forgot">
                  <span>
                    <Link to="/ForgotPassword">forgot password</Link>
                  </span>
                </div>
              </div>

              <div className="form-input">
                <button
                  type="submit"
                  className="submit"
                  disabled={!formIsValid}
                >
                  Login
                </button>
                <div className="create">
                  <span> Don't have an account? </span>
                  <span>
                    <Link to="/Signup"> Create one now </Link>{" "}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
