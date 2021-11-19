import React, { useState } from "react";
import { useToast, Spinner } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { login } from "../store/actions/loginAction";
import { server } from "../apis/server";

export default function Login() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loginReducer);
  const history = useHistory();

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
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
        toast({
          position: "bottom",
          render: () => (
            <div className="py-2 px-3 text-center text-white bg-success" style={{ borderRadius: "20px", fontSize: "12pt" }}>
              Login success! Welcome
            </div>
          ),
          duration: 2000,
        });
        history.push("/homepage");
      })
      .catch((err) => {
        toast({
          position: "top",
          render: () => (
            <div className="py-2 px-3 text-center text-white" style={{ backgroundColor: "#f56356", borderRadius: "20px", fontSize: "12pt" }}>
              {err}
            </div>
          ),
          duration: 2000,
        });
      });
  };

  // google login
  const handleGoogleLogin = async (googleData) => {
    const res = await fetch(`${server}/login-google`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);

      history.push("/homepage");
    }
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
                    style={{
                      backgroundColor: "#dcdddd",
                      borderColor: "#dcdddd",
                      color: "#212121",
                    }}
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
                <button type="submit" className="btn btn-danger btn-block rounded-pill mb-3" disabled={isLoading}>
                  {isLoading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <Spinner size="sm" />
                      &nbsp;Login
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_URL}
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLogin}
                  cookiePolicy={"single_host_origin"}
                  theme="dark"
                  icon={false}
                  render={(renderProps) => (
                    <button className="btn btn-primary btn-block rounded-pill shadow-none" onClick={renderProps.onClick} disabled={isLoading}>
                      Login with google
                    </button>
                  )}
                />
              </form>
              <div className="text-center">
                Dont't have account yet? click{" "}
                <Link className="text-decoration-none text-primary" to="/register">
                  here
                </Link>
                <br />
                <Link className="text-decoration-none text-primary" to="/forgot-password">
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
