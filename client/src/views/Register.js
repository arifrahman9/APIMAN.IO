import React, { useState } from "react";
import { useToast, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { postRegister } from "../store/actions/registerAction";

export default function Register() {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loginReducer);
  const [inputRegister, setInputRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const changeInputRegisterHandler = (e) => {
    const { name, value } = e.target;

    setInputRegister({
      ...inputRegister,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postRegister(inputRegister))
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((err) => {
        toast({
          position: "top",
          render: () => (
            <div className="py-2 px-2 text-center text-white" style={{ backgroundColor: "#f56356", borderRadius: "20px", fontSize: "11pt" }}>
              {err}
            </div>
          ),
          duration: 2000,
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-5">
        <div className="card o-hidden border-0 shadow-lg text-white" style={{ borderRadius: "20px", backgroundColor: "#2d3748" }}>
          <div className="card-body p-0">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h1">APIMAN</h1>
              </div>
              <form className="mt-3 user mb-3" onSubmit={submitHandler}>
                <div className="row form-group">
                  <div className="col pr-1">
                    <label htmlFor="first">First Name</label>
                    <input
                      type="text"
                      className="form-control rounded-pill shadow-none"
                      style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                      autoComplete="off"
                      placeholder="Your first name"
                      name="firstName"
                      id="first"
                      defaultValue={inputRegister.firstName}
                      onChange={changeInputRegisterHandler}
                    />
                  </div>
                  <div className="col pl-1">
                    <label htmlFor="last">Last Name</label>
                    <input
                      type="text"
                      className="form-control rounded-pill shadow-none"
                      style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                      autoComplete="off"
                      placeholder="Your last name"
                      name="lastName"
                      id="last"
                      defaultValue={inputRegister.lastName}
                      onChange={changeInputRegisterHandler}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                    autoComplete="off"
                    placeholder="Enter your unique username"
                    name="username"
                    id="username"
                    defaultValue={inputRegister.username}
                    onChange={changeInputRegisterHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-none"
                    style={{ backgroundColor: "#dcdddd", borderColor: "#dcdddd", color: "#212121" }}
                    autoComplete="off"
                    placeholder="Enter your valid email"
                    name="email"
                    id="email"
                    defaultValue={inputRegister.email}
                    onChange={changeInputRegisterHandler}
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
                    defaultValue={inputRegister.password}
                    onChange={changeInputRegisterHandler}
                  />
                </div>
                <button type="submit" className="btn btn-danger btn-block rounded-pill" disabled={isLoading}>
                  {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <Spinner size="sm" />
                      &nbsp;Register
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              <div className="text-center">
                Already have an account? click&nbsp;
                <Link className="text-decoration-none text-primary" to="/login">
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
