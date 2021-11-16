import React, { useEffect, useRef } from "react";
import Landing1 from "../../assets/logo/Landing1.svg";
import Landing2 from "../../assets/logo/Landing2.png";
import Landing3 from "../../assets/logo/Landing3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAngleDoubleRight, faDatabase } from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.css";
import AOS from "aos";
import { useHistory } from "react-router";

export default function LandingPage() {
  const history = useHistory();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const secondLanding = useRef();
  const thirdLanding = useRef();
  const handleArrowClick = () => {
    secondLanding.current.scrollIntoView({
      behaviour: "smooth",
    });
  };
  const handleSecondArrowClick = () => {
    thirdLanding.current.scrollIntoView({
      behaviour: "smooth",
    });
  };
  return (
    <div>
      <section id="landing-1" style={{ overflow: "hidden", height: "100vh" }}>
        <div className="m-4 d-flex align-items-center justify-content-between">
          <FontAwesomeIcon icon={faDatabase} size="2x" color="#f56e56" />
          <a href="https://github.com/rasyidrmhd/APIMAN.io" target="blank" className="text-decoration-none">
            <FontAwesomeIcon icon={faGithub} size="2x" color="#f56e56" />
          </a>
        </div>
        <div className="row">
          <div className="col d-flex flex-column align-items-center justify-content-center" data-aos="fade-left">
            <h1 className="text-light h1">
              Welcome to <span className="text-danger">APIMAN</span>
            </h1>
            <h3 className="text-light px-5 text-center">
              <span className="text-danger">APIMAN</span>&nbsp;is a lightweight and user-friendly web-based API tester aimed for developers.
            </h3>
          </div>
          <div className="col" data-aos="fade-right">
            <img src={Landing1} alt="Previous" width="90%" height="90%" />
          </div>
        </div>
        <div className="arrow" onClick={handleArrowClick}></div>
      </section>
      <section id="landing-2" style={{ overflowX: "hidden", height: "100vh" }} ref={secondLanding}>
        <div className="row">
          <div className="col d-flex align-items-center justify-content-center" style={{ height: "100vh" }} data-aos="fade-right">
            <img src={Landing2} alt="Previous" />
          </div>
          <div className="col d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }} data-aos="fade-left">
            <h1 className="text-light h1 text-center">
              Why <span className="text-danger">APIMAN</span> ?
            </h1>
            <h3 className="text-light px-5" style={{ textAlign: "justify" }}>
              &lt; <span className="text-danger">APIMAN</span> allows users to hit API endpoints with methods such as <span className="text-success">GET</span>, <span className="text-warning">POST</span>,{" "}
              <span className="text-primary">PUT</span>, <span className="text-danger">DELETE</span>, and <span className="text-info">PATCH</span>. Users can also import list of endpoints via JSON file, hit the API, and save the response if
              desired. Each API requests will be logged to the histories list to be reused when needed /&gt;
            </h3>
          </div>
        </div>
        <div className="second-arrow" onClick={handleSecondArrowClick}></div>
      </section>
      <section id="landing-3 text-center" style={{ height: "100vh" }}>
        <div className="col d-flex flex-column align-items-center justify-content-center image-container" style={{ top: "35%" }} data-aos="fade-down" ref={thirdLanding}>
          <img src={Landing3} alt="Previous" width="70%" height="70%" />
          <button
            className="btn btn-danger next-btn text-light"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              if (localStorage.getItem("access_token")) {
                history.push("/homepage")
              } else {
                history.push("/login")
              }
            }}
          >
            <span style={{ textAlign: "center" }}>Start using now</span>
            &nbsp;
            <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" color="#ffff" style={{ verticalAlign: "middle" }} />
          </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ zIndex: "-1" }}>
          <path
            fill="#f46e56"
            fill-opacity="1"
            d="M0,64L40,85.3C80,107,160,149,240,149.3C320,149,400,107,480,122.7C560,139,640,213,720,240C800,267,880,245,960,229.3C1040,213,1120,203,1200,176C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
          <span className="text-light" style={{ zIndex: "99" }}>
            APIMAN.io
          </span>
        </svg>
      </section>
    </div>
  );
}
