import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-lg-4 col-sm-8">
        <div className="card o-hidden border-0 shadow-lg" style={{ borderRadius: "20px" }}>
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1>APIMAN.io</h1>
              </div>
              <form className="mt-3 user mb-3">
                <div className="form-group">
                  <label htmlFor="email">Username / Email</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                    autoComplete="off"
                    placeholder="Enter your unique username or email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                    autoComplete="off"
                    placeholder="Enter you strong password"
                    name="password"
                    id="password"
                  />
                </div>
                <button onClick={buttonHandler} type="submit" className="btn btn-danger btn-block rounded-pill mb-3">
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
                <Link className="text-decoration-none" to="/forgot-password">
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
