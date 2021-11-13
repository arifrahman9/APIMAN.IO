import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, fetchUserdata } from "../store/actions/loginAction";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const changeInputLoginHandler = (e) => {
    const { value, name } = e.target;

    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(inputLogin))
      .then((response) => {
        const access_token = response.access_token;
        localStorage.setItem("access_token", access_token);
        history.push("/");
      })
      .catch((err) => {
        setError({
          status: true,
          message: err,
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-xl-5 col-lg-8 col-md-8">
        <div className="card o-hidden border-0 shadow-lg" style={{ borderRadius: "20px" }}>
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1>APIMAN.io</h1>
              </div>
              {error.status ? (
                <div className="text-center">
                  <span className="badge badge-pill badge-danger">{error.message}</span>
                </div>
              ) : (
                ""
              )}
              <form className="mt-3 user mb-3" onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="email">Username / Email</label>
                  <input
                    className="form-control rounded-pill shadow-none bg-secondary border-secondary text-dark"
                    placeholder="Enter your unique username or email"
                    autoComplete="off"
                    name="email"
                    type="text"
                    id="email"
                    defaultValue={inputLogin.email}
                    onChange={changeInputLoginHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                    className="form-control rounded-pill shadow-none"
                    placeholder="Enter you strong password"
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                    defaultValue={inputLogin.password}
                    onChange={changeInputLoginHandler}
                  />
                </div>
                <button type="submit" className="btn btn-danger btn-block rounded-pill mb-3">
                  Login
                </button>
                <button type="submit" className="btn btn-primary btn-block rounded-pill">
                  Login with Google
                </button>
              </form>
              <div className="text-center">
                Dont't have account yet? click{" "}
                <Link className="text-decoration-none" to="/register">
                  here
                </Link>
                <br />
                <Link className="text-decoration-none" to="/">
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
