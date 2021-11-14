import { faAngleRight, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchCollections } from "../store/actions/collectionAction";
import { fetchHistories } from "../store/actions/historiesAction";
import { fetchUserdata } from "../store/actions/loginAction";
import { postRequest } from "../store/actions/requestAction";

export default function Home() {
  const dispatch = useDispatch();
  const [resultHeader, setResultHeader] = useState({
    status: "",
    responseTime: "",
  });
  const [resultPanel, setResultPanel] = useState();
  const [inputMethodUrl, setMethodUrl] = useState({
    method: "get",
    url: "",
  });

  const [hoverStatus, setHoverStatus] = useState({ idx: -1 });
  const toggleHover = (idx) => {
    setHoverStatus({
      idx,
    });
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        console.log("CTRL + ENTER");
        setMethodUrl(inputMethodUrl);
        setInputParams(inputParams);
        setInputHeaders(inputHeaders);
        setInputBodyForms(inputBodyForms);
        submitHandler();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { userdata } = useSelector((state) => state.loginReducer);
  const { histories } = useSelector((state) => state.historyReducer);
  const { collections } = useSelector((state) => state.collectionReducer);

  const historyText = (method) => {
    if (method === "get") {
      return "text-success";
    } else if (method === "post") {
      return "text-warning";
    } else if (method === "put") {
      return "text-primary";
    } else if (method === "patch") {
      return "text-info";
    } else if (method === "delete") {
      return "text-danger";
    }
  };

  const populateHistory = (obj) => {
    const result = [];
    for (const key in obj) {
      result.push({ key, value: obj[key] });
    }

    return result;
  };

  const getHistoriesCollection = (id) => {
    let filtered = histories.filter((history) => history.CollectionId === id);
    return filtered;
  };

  useEffect(() => {
    dispatch(fetchUserdata());
    dispatch(fetchHistories());
    dispatch(fetchCollections());
  }, []);

  const [paramsHeaders, setParamsHeader] = useState("params");
  const [inputParams, setInputParams] = useState([{ key: "", value: "" }]);
  const addInputParams = () => {
    setInputParams([...inputParams, { key: "", value: "" }]);
  };

  const removeInputParams = (idx) => {
    const values = [...inputParams];
    values.splice(idx, 1);
    setInputParams(values);
  };

  const changeInputParams = (idx, e) => {
    const values = [...inputParams];
    values[idx][e.target.name] = e.target.value;
    setInputParams(values);
  };

  const [inputHeaders, setInputHeaders] = useState([{ key: "", value: "" }]);
  const addInputHeaders = () => {
    setInputHeaders([...inputHeaders, { key: "", value: "" }]);
  };

  const removeInputHeaders = (idx) => {
    const values = [...inputHeaders];
    values.splice(idx, 1);
    setInputHeaders(values);
  };

  const changeInputHeaders = (idx, e) => {
    const values = [...inputHeaders];
    values[idx][e.target.name] = e.target.value;
    setInputHeaders(values);
  };

  const [body, setBody] = useState("form");

  const [inputBodyForms, setInputBodyForms] = useState([{ key: "", value: "" }]);
  const addInputBodyForms = () => {
    setInputBodyForms([...inputBodyForms, { key: "", value: "" }]);
  };

  const removeInputBodyForms = (idx) => {
    const values = [...inputBodyForms];
    values.splice(idx, 1);
    setInputBodyForms(values);
  };

  const changeInputBodyForms = (idx, e) => {
    const values = [...inputBodyForms];
    values[idx][e.target.name] = e.target.value;
    setInputBodyForms(values);
  };

  const changeMethodUrlHandler = (e) => {
    const { name, value } = e.target;

    setMethodUrl({
      ...inputMethodUrl,
      [name]: value,
    });
  };

  const [inputBodyRaw, setInputBodyRaw] = useState();
  const changeInputBodyRaw = (e) => {
    const { value } = e.target;
    setInputBodyRaw(value);
  };

  const submitHandler = () => {
    let found = undefined;
    for (const key in inputHeaders) {
      if (inputHeaders[key].key !== "" || inputHeaders[key].value !== "") {
        found = inputHeaders;
        break;
      }
    }

    // console.log(inputMethodUrl, "method url");
    // console.log(inputParams, "paramss");
    // console.log(inputHeaders, "headerss");
    // console.log(inputBodyForms, "body forms");
    // console.log(inputBodyRaw, "body rawww");
    dispatch(postRequest(inputMethodUrl.method, inputMethodUrl.url, inputBodyForms, found, inputParams, false))
      .then((response) => {
        // setResultPanel(response.response);
        setResultHeader({
          status: response.status,
          responseTime: `${response.responseTime} ms`,
        });
        dispatch(fetchHistories());
        // console.log(resultPanel);
        console.log(response, "dari homeee");
      })
      .catch((err) => {
        setResultPanel(err.response);
        setResultHeader({
          status: err.status,
          responseTime: err.responseTime,
        });
        console.log(err, "dari error homeee");
      });
  };

  return (
    <>
      <Navbar inputMethodUrl={inputMethodUrl} changeMethodUrlHandler={changeMethodUrlHandler} submitHandler={submitHandler} userdata={userdata} />

      <div className="row mx-1 mt-2 mb-2" style={{ overflowX: "hidden", height: "88vh", overflow: "hidden", fontSize: "10pt" }}>
        {/* Card Left */}
        <div className="col-4 px-1">
          <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "88vh" }}>
            <div className="card-header mx-2 pt-2 px-2 pb-2" style={{ backgroundColor: "#2d3748" }}>
              <nav>
                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active text-white" id="pills-collection-tab" data-toggle="pill" href="#pills-collection" role="tab" aria-controls="pills-collection" aria-selected="true">
                      Collection
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" id="pills-request-tab" data-toggle="pill" href="#pills-request" role="tab" aria-controls="pills-request" aria-selected="true">
                      Request
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" id="pills-history-tab" data-toggle="pill" href="#pills-history" role="tab" aria-controls="pills-history" aria-selected="false">
                      History
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="card-body py-2 px-3 text-wrap" style={{ overflowY: "auto" }}>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-collection" role="tabpanel" aria-labelledby="pills-collection-tab">
                  {/* <button className="btn btn-primary btn-sm btn-block rounded-pill fixed">Add New</button> */}
                  <div style={{ height: "100%" }}>
                    {collections.length === 0 ? (
                      <p>You didnt search anything yet</p>
                    ) : (
                      collections.map((collection, idx) => {
                        return (
                          <div key={collection._id}>
                            <a className="text-decoration-none text-white" data-toggle="collapse" href={`#collapse${collection._id}`}>
                              <div className="row p-2" style={hoverStatus.idx === idx ? { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" } : {}} onMouseEnter={() => toggleHover(idx)} onMouseLeave={() => toggleHover(-1)}>
                                <div className="col-1">
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                                <div className="col-11">{collection.name}</div>
                              </div>
                            </a>
                            <div className="row collapse" id={`collapse${collection._id}`}>
                              <div className="col-11 offset-1">
                                {getHistoriesCollection(collection._id).length === 0 ? (
                                  <p className="p-2">
                                    This collection is empty. Please{" "}
                                    <a className="text-danger text-decoration-none" href="#">
                                      add request
                                    </a>{" "}
                                    to start working
                                  </p>
                                ) : (
                                  histories
                                    .filter((h) => h.CollectionId === collection._id)
                                    .map((history, idx) => (
                                      <a
                                        href="#"
                                        className="text-decoration-none text-white"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setMethodUrl({
                                            method: history.method,
                                            url: history.url,
                                          });

                                          setInputParams(populateHistory(history.params));
                                          setInputBodyForms(populateHistory(history.bodies));
                                          setInputHeaders(populateHistory(history.headers));
                                        }}
                                      >
                                        <div
                                          className="row mb-1 py-1"
                                          key={history.id}
                                          style={hoverStatus.idx === history._id ? { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" } : {}}
                                          onMouseEnter={() => toggleHover(history._id)}
                                          onMouseLeave={() => toggleHover(-1)}
                                        >
                                          <div className="col-2 px-1 text-right">
                                            <span className={historyText(history.method)}>{history.method}</span>
                                          </div>
                                          <div className={`col-10 px-1`}>{history.url}</div>
                                        </div>
                                      </a>
                                    ))
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="tab-pane fade show" id="pills-request" role="tabpanel" aria-labelledby="pills-request-tab">
                  Request
                </div>
                <div className="tab-pane fade text-wrap" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab">
                  {histories.length === 0 ? (
                    <p>You didnt search anything yet</p>
                  ) : (
                    histories.map((history, idx) => {
                      return (
                        <a
                          href="#"
                          className="text-decoration-none text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setMethodUrl({
                              method: history.method,
                              url: history.url,
                            });

                            setInputParams(populateHistory(history.params));
                            setInputBodyForms(populateHistory(history.bodies));
                            setInputHeaders(populateHistory(history.headers));
                          }}
                        >
                          <div
                            className="row mb-1 py-1"
                            key={history.id}
                            style={hoverStatus.idx === idx ? { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" } : {}}
                            onMouseEnter={() => toggleHover(idx)}
                            onMouseLeave={() => toggleHover(-1)}
                          >
                            <div className="col-2 px-1 text-right">
                              <span className={historyText(history.method)}>{history.method}</span>
                            </div>
                            <div className={`col-10 px-1`}>{history.url}</div>
                          </div>
                        </a>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Card Left */}

        {/* Card Middle */}
        <div className="col-4 px-1">
          <div className="card o-hidden border-0 mb-2 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "43vh" }}>
            <div className="d-flex card-header mx-2 pt-2 px-0 pb-2 align-items-center justify-content-between" style={{ backgroundColor: "#2d3748" }}>
              <div>
                <nav>
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active text-white"
                        data-toggle="pill"
                        href="#pills-params"
                        onClick={(e) => {
                          setParamsHeader("params");
                        }}
                      >
                        Params
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-white"
                        data-toggle="pill"
                        href="#pills-headers"
                        onClick={(e) => {
                          setParamsHeader("headers");
                        }}
                      >
                        Headers
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <button className="btn btn-primary btn-sm btn-circle" onClick={paramsHeaders === "params" ? addInputParams : addInputHeaders}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="card-body p-2" style={{ overflowY: "auto" }}>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-params">
                  {inputParams.map((inputParam, idx) => (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none shadow-none border-0 rounded-pill bg-secondary mb-1 mr-1"
                        placeholder="Key"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputParam.key}
                        name="key"
                        autoComplete="off"
                        onChange={(e) => changeInputParams(idx, e)}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none  shadow-none border-0 rounded-pill bg-secondary mr-1"
                        placeholder="Value"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputParam.value}
                        name="value"
                        autoComplete="off"
                        onChange={(e) => changeInputParams(idx, e)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-danger btn-sm rounded-circle mb-1"
                          type="button"
                          disabled={idx === 0}
                          style={{
                            borderRadius: 0,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            removeInputParams(idx);
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tab-pane fade" id="pills-headers">
                  {inputHeaders.map((inputHeader, idx) => (
                    <div key={idx} className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none shadow-none border-0 rounded-pill bg-secondary mb-1 mr-1"
                        placeholder="Key"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputHeader.key}
                        name="key"
                        autoComplete="off"
                        onChange={(e) => changeInputHeaders(idx, e)}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none shadow-none border-0 rounded-pill bg-secondary mr-1"
                        placeholder="Value"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputHeader.value}
                        name="value"
                        autoComplete="off"
                        onChange={(e) => changeInputHeaders(idx, e)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-danger btn-sm rounded-circle mb-1"
                          type="button"
                          disabled={idx === 0}
                          style={{
                            borderRadius: 0,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            removeInputHeaders(idx);
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Body Form Below Here */}
          <div className="card o-hidden border-0" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "44vh" }}>
            <div className="d-flex card-header border-0 p-2 justify-content-between align-items-center text-white" style={{ backgroundColor: "#2d3748" }}>
              <div>
                <div className="custom-control custom-radio custom-control-inline" onClick={() => setBody("form")}>
                  <input type="radio" id="bodyForm" name="body" className="custom-control-input" defaultChecked={body === "form"} />
                  <label className="custom-control-label" htmlFor="bodyForm">
                    Form
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline" onClick={() => setBody("raw")}>
                  <input type="radio" id="bodyRaw" name="body" className="custom-control-input" defaultChecked={body === "raw"} />
                  <label className="custom-control-label" htmlFor="bodyRaw">
                    Raw
                  </label>
                </div>
              </div>
              {body === "form" ? (
                <button className="btn btn-primary btn-sm btn-circle" onClick={addInputBodyForms}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="card-body p-2" style={{ overflow: "auto" }}>
              {body === "form" ? (
                inputBodyForms.map((inputBodyForm, idx) => (
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm shadow-none border-0 rounded-pill bg-secondary mb-1 mr-1"
                      placeholder="Key"
                      style={{ color: "#212121" }}
                      defaultValue={inputBodyForm.key}
                      name="key"
                      autoComplete="off"
                      onChange={(e) => changeInputBodyForms(idx, e)}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm shadow-none border-0 rounded-pill bg-secondary mr-1"
                      placeholder="Value"
                      style={{ color: "#212121" }}
                      defaultValue={inputBodyForm.value}
                      name="value"
                      autoComplete="off"
                      onChange={(e) => changeInputBodyForms(idx, e)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger btn-sm rounded-circle mb-1"
                        type="button"
                        disabled={idx === 0}
                        style={{
                          borderRadius: 0,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          removeInputBodyForms(idx);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <textarea className="form-control shadow-none border-0 body-raw bg-secondary" cols="30" rows="9" style={{ color: "#212121", resize: "none", height: "100%" }} onChange={changeInputBodyRaw} value={inputBodyRaw}></textarea>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Card Middle */}

        {/* Card Right */}
        <div className="col-4 px-1">
          <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "88vh" }}>
            <div className="d-flex card-header border-0 flex-column p-2" style={{ backgroundColor: "#2d3748" }}>
              <div className="d-flex justify-content-between">
                <span>Response</span>
                <span></span>
              </div>
              <div>
                Status: <span className="text-success">{resultHeader.status}</span>&nbsp; Time:&nbsp;<span className="text-success">{resultHeader.responseTime}</span>
              </div>
            </div>
            <div className="card-body pb-2 pt-0 px-2" style={{ overflow: "auto" }}>
              <textarea
                className="form-control shadow-none border-0 bg-secondary border-0 text-dark body-raw"
                cols="30"
                style={{ resize: "none", height: "100%", fontSize: "10pt" }}
                defaultValue={JSON.stringify(resultPanel, null, 2)}
                disabled
              ></textarea>
            </div>
          </div>
        </div>
        {/* Card Rigth */}
      </div>
    </>
  );
}
