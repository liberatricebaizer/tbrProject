import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import userIcon from "../../assets/user.png";
import ImagetoBase from "../../utility/ImagetoBase";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [enteredConfirmPasswordTouched, setEnteredConfirmPasswordTouched] =
    useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  // console.log(data);

  const enteredFirstNameIsValid = data.firstName.trim() !== "";
  const firstNameIsInvalid =
    !enteredFirstNameIsValid && enteredFirstNameTouched;

  const enteredLastNameIsValid = data.lastName.trim() !== "";
  const lastNameIsInValid = !enteredLastNameIsValid && enteredLastNameTouched;

  const enteredEmailIsValid = data.email.includes("@");
  const emailIsInValid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = data.password.trim() !== "";
  const enteredPasswordIsInValid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredConfirmPasswordIsValid = data.confirmPassword.trim() !== "";
  const enteredConfirmPasswordIsInValid =
    !enteredConfirmPasswordIsValid && enteredConfirmPasswordTouched;

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const firstNameBlurHandler = (e) => {
    setEnteredFirstNameTouched(true);
  };

  const lastNameBlurHandler = (e) => {
    setEnteredLastNameTouched(true);
  };

  const emailBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const passwordBlurHandler = (e) => {
    setEnteredPasswordTouched(true);
  };
  const confirmPasswordBlurHandler = (e) => {
    setEnteredConfirmPasswordTouched(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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
    setEnteredFirstNameTouched(true);
    setEnteredLastNameTouched(true);
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);
    setEnteredConfirmPasswordTouched(true);

    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
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
          navigate("/Signin");
        }
      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("Please Enter required fields");
    }

    setEnteredFirstNameTouched(false);
    setEnteredLastNameTouched(false);
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
    setEnteredConfirmPasswordTouched(false);
  };

  const firstNameClasses = firstNameIsInvalid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const lastNameClasses = lastNameIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const emailClasses = emailIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const passwordClasses = enteredPasswordIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const confirmPasswordClasses = enteredConfirmPasswordIsInValid
    ? "form-input-sign invalid"
    : "form-input-sign";

  const handlerUploadfile = async (e) => {
    const data = await ImagetoBase(e.target.files[0]);
    console.log(data);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  return (
    <Fragment>
      <div className="form_box-sign">
        <div className="sign-box">
          <div className="img-sign"></div>

          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <div className="logo">
                <img
                  src={data.image ? data.image : userIcon}
                  alt="user"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* <h2>TBR Agency</h2> */}
                <label htmlFor="profileImage" className="label">
                  <div className="upload">
                    <p>Upload</p>
                  </div>
                  <input
                    type={"file"}
                    id="profileImage"
                    accept="image/*"
                    onChange={handlerUploadfile}
                    style={{ overflow: "hidden" }}
                  />
                </label>
              </div>
              <div className="username-sign">
                <div className={firstNameClasses}>
                  <input
                    type={"text"}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    onBlur={firstNameBlurHandler}
                    value={data.firstName}
                    onChange={handleOnChange}
                  />
                  {firstNameIsInvalid && <p>FirstName must not be empty.</p>}
                </div>
                <div className={lastNameClasses}>
                  <input
                    type={"text"}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    onBlur={lastNameBlurHandler}
                    value={data.lastName}
                    onChange={handleOnChange}
                  />
                  {lastNameIsInValid && <p>LastName must not be empty.</p>}
                </div>
              </div>
              <div className={emailClasses}>
                <input
                  type={"email"}
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onBlur={emailBlurHandler}
                  value={data.email}
                  onChange={handleOnChange}
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    onBlur={passwordBlurHandler}
                    value={data.password}
                    onChange={handleOnChange}
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

              <div>
                <div
                  className={confirmPasswordClasses}
                  style={{
                    display: "flex",
                    border: "solid 1px #0ca678",
                    borderRadius: "3px",
                    alignItems: "center",
                    paddingRight: "3px",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmPassword"
                    placeholder="Confirm Your Password"
                    onBlur={confirmPasswordBlurHandler}
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    style={{ border: "none", outline: "none" }}
                  />
                  <span
                    style={{
                      display: "flex",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>
                {enteredConfirmPasswordIsInValid && (
                  <p> confirm your password.</p>
                )}
              </div>

              <div className="form-input">
                <button
                  type="submit"
                  disabled={!formIsValid}
                  className="submit"
                >
                  Sign up
                </button>
                <div className="create">
                  <span> Already have account ? </span>
                  <span>
                    <Link to="/SignIn"> Login now </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
