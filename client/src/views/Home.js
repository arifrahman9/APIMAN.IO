import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [inputMethodUrl, setMethodUrl] = useState({
    method: "get",
    url: "",
  });

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

  const [inputBodyRaw, setInputBodyRaw] = useState(`{"name": "acit", "age": 6}`);
  const changeInputBodyRaw = (e) => {
    const { value } = e.target;
    setInputBodyRaw(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(inputMethodUrl, "method url");
    console.log(inputParams, "paramss");
    console.log(inputHeaders, "headerss");
    console.log(inputBodyForms, "body forms");
    console.log(inputBodyRaw, "body rawww");
  };

  return (
    <>
      <Navbar inputMethodUrl={inputMethodUrl} changeMethodUrlHandler={changeMethodUrlHandler} submitHandler={submitHandler} />

      <div className="row mx-0 mt-2 mb-2" style={{ overflowX: "hidden" }}>
        {/* Card Left */}
        <div className="col-4 px-1 border-secondary" style={{ position: "fixed", height: "89vh" }}>
          <div className="card o-hidden border-0 h-100" style={{ borderRadius: "10px", backgroundColor: "#fefefe" }}>
            <div className="card-header">History Collection</div>
            <div className="card-body"></div>
          </div>
        </div>
        {/* End Card Left */}

        {/* Card Middle */}
        <div className="col-4 px-1 offset-4">
          <div className="card o-hidden border-0 mb-2" style={{ borderRadius: "10px", backgroundColor: "#fefefe" }}>
            <div className="d-flex card-header p-2 align-items-center justify-content-between">
              <div>
                <div
                  className="custom-control custom-radio custom-control-inline"
                  onClick={(e) => {
                    setParamsHeader("params");
                  }}
                >
                  <input type="radio" id="params" name="paramsHeaders" value="params" className="custom-control-input" defaultChecked={paramsHeaders === "params"} />
                  <label className="custom-control-label" htmlFor="params">
                    Params
                  </label>
                </div>
                <div
                  className="custom-control custom-radio custom-control-inline"
                  onClick={(e) => {
                    setParamsHeader("headers");
                  }}
                >
                  <input type="radio" id="headers" name="paramsHeaders" value="headers" className="custom-control-input" defaultChecked={paramsHeaders === "headers"} />
                  <label className="custom-control-label" htmlFor="headers">
                    Headers
                  </label>
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={paramsHeaders === "params" ? addInputParams : addInputHeaders}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="card-body p-2">
              {paramsHeaders === "params"
                ? inputParams.map((inputParam, idx) => (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none"
                        placeholder="Key"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputParam.key}
                        name="key"
                        autoComplete="off"
                        onChange={(e) => changeInputParams(idx, e)}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none"
                        placeholder="Value"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputParam.value}
                        name="value"
                        autoComplete="off"
                        onChange={(e) => changeInputParams(idx, e)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-danger btn-sm"
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
                  ))
                : inputHeaders.map((inputHeader, idx) => (
                    <div key={idx} className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none"
                        placeholder="Key"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputHeader.key}
                        name="key"
                        autoComplete="off"
                        onChange={(e) => changeInputHeaders(idx, e)}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none"
                        placeholder="Value"
                        style={{ color: "#212121", borderRadius: 0 }}
                        defaultValue={inputHeader.value}
                        name="value"
                        autoComplete="off"
                        onChange={(e) => changeInputHeaders(idx, e)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-danger btn-sm"
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

          {/* Card Body Form Below Here */}
          <div className="card o-hidden border-0" style={{ borderRadius: "10px", backgroundColor: "#fefefe" }}>
            <div className="d-flex card-header p-2 justify-content-between align-items-center">
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
                <button className="btn btn-primary btn-sm" onClick={addInputBodyForms}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="card-body p-2">
              {body === "form" ? (
                inputBodyForms.map((inputBodyForm, idx) => (
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm shadow-none"
                      placeholder="Key"
                      style={{ color: "#212121", borderRadius: 0 }}
                      defaultValue={inputBodyForm.key}
                      name="key"
                      autoComplete="off"
                      onChange={(e) => changeInputBodyForms(idx, e)}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm shadow-none"
                      placeholder="Value"
                      style={{ color: "#212121", borderRadius: 0 }}
                      defaultValue={inputBodyForm.value}
                      name="value"
                      autoComplete="off"
                      onChange={(e) => changeInputBodyForms(idx, e)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger btn-sm"
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
                  <textarea className="form-control" cols="30" rows="5" style={{ color: "#212121", resize: "none" }} onChange={changeInputBodyRaw} value={inputBodyRaw}></textarea>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Card Middle */}

        {/* Card Right */}
        <div className="col-4 px-1">
          <div className="card o-hidden border-0 h-100" style={{ borderRadius: "10px", backgroundColor: "#fefefe" }}>
            <div className="d-flex card-header justify-content-between">
              <span>Response</span>
              <span>Status</span>
            </div>
            <div className="card-body">
              <p>Sample Response</p>
            </div>
          </div>
        </div>
        {/* Card Rigth */}
      </div>
    </>
  );
}
