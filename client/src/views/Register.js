import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-xl-5 col-lg-8 col-md-8">
        <div className="card o-hidden border-0 shadow-lg" style={{ borderRadius: "20px" }}>
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1>APIMAN.io</h1>
              </div>
              <form className="mt-3 user mb-3">
                <div className="row form-group">
                  <div className="col pr-1">
                    <label htmlFor="first">First Name</label>
                    <input type="text" className="form-control rounded-pill shadow-none" style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd" }} autoComplete="off" placeholder="Your first name" name="firstName" id="first" />
                  </div>
                  <div className="col pl-1">
                    <label htmlFor="last">Last Name</label>
                    <input type="text" className="form-control rounded-pill shadow-none" style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd" }} autoComplete="off" placeholder="Your last name" name="lastName" id="last" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd" }}
                    autoComplete="off"
                    placeholder="Enter your unique username"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control rounded-pill shadow-none" style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd" }} autoComplete="off" placeholder="Enter your valid email" name="email" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd" }}
                    autoComplete="off"
                    placeholder="Enter you strong password"
                    name="password"
                    id="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block rounded-pill">
                  Register
                </button>
              </form>
              <div className="text-center">
                Already have an account? click&nbsp;
                <Link className="text-decoration-none" to="/login">
                  here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
