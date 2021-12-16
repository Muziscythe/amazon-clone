import React, { useState, useContext } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError("");
      setLoading(true);
      signup(email, password);
    }
    setLoading(false);
  }

  return (
    <div className="login">
      <img
        onClick={() => navigate("/")}
        className="login__logo"
        src="https://tse2.mm.bing.net/th?id=OIP.dU7voyou7U7ujxf3AsNAwgHaDH&pid=Api&P=0&w=385&h=161"
        alt=""
      />
      <div className="login__container">
        <h2>Sign-In</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login__info">
            <h4>Email</h4>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
            <h4>Password</h4>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
            <h4>Confirm Password</h4>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
            />
          </div>
          <button disabled={loading} type="submit" className="login__SignIn">
            Sign Up
          </button>
          <p className="login__terms">
            By continuing, you agree to Amazon-fake-clone Conditions of Use and
            Privacy Notice.
          </p>
          <p className="login__new">Already have an account?</p>
          <button onClick={() => navigate("/login")} className="login__SignUp">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
