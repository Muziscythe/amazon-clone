import React, { useState } from "react";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    login(email, password);
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
          </div>
          <button disabled={loading} type="submit" className="login__SignIn">
            Sign In
          </button>
          <p className="login__terms">
            By continuing, you agree to Amazon-fake-clone Conditions of Use and
            Privacy Notice.
          </p>
          <p className="login__new">New to Amazon?</p>
          <button onClick={() => navigate("/signup")} className="login__SignUp">
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
