import React, { useEffect, useState, useRef } from "react";
import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { faAngleRight, faMinus, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections,postCollection } from "../store/actions/collectionAction";
import { addNewHistory, addToCollections, deleteHistory, fetchHistories } from "../store/actions/historiesAction";
import { fetchUserdata } from "../store/actions/loginAction";
import { postRequest } from "../store/actions/requestAction";
import NavbarNew from "../components/Navbar";
import ReactJson from 'react-json-view'

export default function HomePage() {
  // Buat itung container
  // Chakra layout start
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbar = useRef(null);
  const bodyHtml = useRef(null);
  const [containerHeight, setConteinerHeight] = useState(0);
  const [panelWidth, setPanelWidth] = useState(0)

  useEffect(() => {
    // letakkan pertama kali
    setPanelWidth(Math.floor(bodyHtml.current.offsetWidth/3))
    setConteinerHeight(bodyHtml.current.offsetHeight - navbar.current.offsetHeight);
  }, []);
  // Chakra layout end

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
  const [inputCollection, setInputCollection] = useState({
    name: "",
  });

  const changeInputCollection = (e) => {
    const { value } = e.target;
    setInputCollection({
      name: value,
    });
  };

  const submitCollection = () => {
    dispatch(postCollection(inputCollection))
      .then((response) => {
        console.log(response, ">>>>home");
        setInputCollection({
          name: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [hoverStatus, setHoverStatus] = useState({ idx: -1 });
  const toggleHover = (idx) => {
    setHoverStatus({
      idx,
    });
  };

  const { userdata } = useSelector((state) => state.loginReducer);
  const { histories, isLoading: loadingHistory } = useSelector((state) => state.historyReducer);
  const { collections } = useSelector((state) => state.collectionReducer);

  const historyText = (method) => {
    if (method === "get" || method === "2") {
      return "text-success";
    } else if (method === "post" || method === "5") {
      return "text-warning";
    } else if (method === "put") {
      return "text-primary";
    } else if (method === "delete" || method === "4") {
      return "text-danger";
    } else {
      return "text-info";
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

  const [inputAddHistory, setInputAddHistory] = useState({ historyId: "", collectionId: "" });
  const [modalFooter, setmodalFooter] = useState(false);

  const submitHandler = () => {
    let headerSend = undefined;
    for (const key in inputHeaders) {
      if (inputHeaders[key].key !== "" || inputHeaders[key].value !== "") {
        headerSend = inputHeaders;
        break;
      }
    }

    let bodySend;
    let bodyIsRaw;
    if (body === "form") {
      bodySend = inputBodyForms;
      bodyIsRaw = false;
    } else {
      bodySend = JSON.parse(inputBodyRaw);
      bodyIsRaw = true;
    }

    dispatch(postRequest(inputMethodUrl.method, inputMethodUrl.url, bodySend, headerSend, inputParams, bodyIsRaw))
      .then((response) => {
        setResultPanel(response.response);
        setResultHeader({
          status: response.status,
          responseTime: `${response.responseTime} ms`,
        });
        dispatch(addNewHistory(response.newAddedHistory[0]));
      })
      .catch((err) => {
        setResultPanel(err.response);
        setResultHeader({
          status: err.status,
          responseTime: `${err.responseTime} ms`,
        });
        console.log(err, "dari error homeee");
      });
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        console.log("CTRL + ENTER");
        console.log(inputMethodUrl);
        // setMethodUrl(inputMethodUrl);
        // setInputParams(inputParams);
        // setInputHeaders(inputHeaders);
        // setInputBodyForms(inputBodyForms);
        // submitHandler();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  return (
    <Flex ref={bodyHtml} bgColor='gray.800' h='100vh' w='100vw' flexDir='column'>
      {/* for navbar section */}
      <Flex ref={navbar} bgColor='gray.700'>
        <NavbarNew inputMethodUrl={inputMethodUrl} changeMethodUrlHandler={changeMethodUrlHandler} submitHandler={submitHandler} userdata={userdata} />
      </Flex>
      {/* for main section */}
      <Flex h={containerHeight} justifyContent='space-evenly' alignItems='center'>
        {/* for main left section */}
        <Flex justifyContent='center' alignItems='center' p={2} h={containerHeight} w={panelWidth}>
          <div className="card o-hidden border-0 text-white " style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "100%", width: "100%" }}>
            <div className="card-header mx-2 pt-2 px-2 pb-2" style={{ backgroundColor: "#2d3748" }}>
              <nav>
                <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active text-white" id="pills-collection-tab" data-toggle="pill" href="#pills-collection" role="tab" aria-controls="pills-collection" aria-selected="true">
                      <div class="btn-group">Collections</div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" id="pills-request-tab" data-toggle="pill" href="#pills-request" role="tab" aria-controls="pills-request" aria-selected="true">
                      Import Request
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
            <div className="card-body py-2 px-3 text-wrap" style={{ overflowY: "auto", overflowX: "hidden" }}>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-collection" role="tabpanel" aria-labelledby="pills-collection-tab">
                  <form
                    className="row px-0 text-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitCollection();
                    }}
                  >
                    <div className="col-9 pr-0">
                      <input
                        type="text"
                        className="form-control form-control-sm shadow-none shadow-none border-0 rounded-pill bg-secondary mb-1 mr-1"
                        placeholder="New collection name"
                        style={{ color: "#212121", borderRadius: 0 }}
                        name="name"
                        autoComplete="off"
                        defaultValue={inputCollection.name}
                        onChange={changeInputCollection}
                      />
                    </div>
                    <div className="col-3 px-0">
                      <button href="#" type="submit" className="btn btn-danger btn-sm mb-2 text-center text-decoration-none rounded-pill">
                        Add New
                      </button>
                    </div>
                  </form>
                  <Flex flex={1} flexDirection="column" width="100%" height="100%">
                    {collections.length === 0 ? (
                      <p>You dont have any collection yet</p>
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
                                  <p className="p-2">This collection is empty.</p>
                                ) : (
                                  histories
                                    .filter((h) => h.CollectionId === collection._id)
                                    .map((history, idx) => (
                                      <div
                                        className="row"
                                        style={hoverStatus.idx === history._id ? { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" } : {}}
                                        onMouseEnter={() => toggleHover(history._id)}
                                        onMouseLeave={() => toggleHover(-1)}
                                      >
                                        <a
                                          href="#"
                                          className="col-11 text-decoration-none text-white"
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
                                          <div className="row mb-1 py-1" key={history.id}>
                                            <div className="col-2 px-1 text-right">
                                              <span className={historyText(history.method)}>{history.method}</span>
                                            </div>
                                            <div className={`col-8 px-1`}>{history.url}</div>
                                          </div>
                                        </a>
                                        {hoverStatus.idx === history._id ? (
                                          <div className="col-1 d-flex align-items-center justify-content-around">
                                            <a
                                              href="#"
                                              className="text-decoration-none text-white"
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title="Delete history"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                // dispatch(deleteHistory(history._id));
                                              }}
                                            >
                                              <FontAwesomeIcon icon={faTrash} />
                                            </a>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ))
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </Flex>
                </div>
                <div className="tab-pane fade show" id="pills-request" role="tabpanel" aria-labelledby="pills-request-tab">
                  Request
                </div>
                <div className="tab-pane fade text-wrap" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab">
                  {loadingHistory ? (
                    <h1>Sedang loading history</h1>
                  ) : histories.length === 0 ? (
                    <p>You didnt search anything yet</p>
                  ) : (
                    histories.map((history, idx) => {
                      return (
                        <div className="row" style={hoverStatus.idx === idx ? { backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "20px" } : {}} onMouseEnter={() => toggleHover(idx)} onMouseLeave={() => toggleHover(-1)}>
                          <div className={`col-10`}>
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
                              <div className="row mb-1 py-1" key={history.id}>
                                <div className="col-2 px-1 text-right">
                                  <span className={historyText(history.method)}>{history.method}</span>
                                </div>
                                <div className={`col-10 px-1`}>{history.url}</div>
                              </div>
                            </a>
                          </div>
                          {hoverStatus.idx === idx ? (
                            <div className="col-2 d-flex align-items-center justify-content-around">
                              <a
                                href="#"
                                className={`${history.CollectionId ? "d-none" : ""} text-decoration-none text-white`}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Save to collection"
                                data-toggle="modal"
                                data-target="#addToCollectionModal"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setInputAddHistory({
                                    ...inputAddHistory,
                                    historyId: history._id,
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </a>
                              <a
                                href="#"
                                className="text-decoration-none text-white"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Delete history"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(deleteHistory(history._id));
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </a>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </Flex>
        {/* for main middle section */}
        <Flex p={2} flexDir='column' justifyContent='center' alignItems='center' h={containerHeight} w={panelWidth}>
          {/* for main middle top section */}
          <Flex h={containerHeight/2} w='100%' paddingBottom={1} overflow='hidden'>
            <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "100%", width: "100%" }}>
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
          </Flex>
          {/* for main middle bottom section */}
          <Flex h={containerHeight/2} w='100%' paddingTop={1} overflow='hidden'>
            <div className="card o-hidden border-0" style={{ borderRadius: "10px", backgroundColor: "#2d3748", height: "100%", width: "100%" }}>
              <div className="d-flex card-header mx-2 pt-2 px-0 pb-2 align-items-center justify-content-between" style={{ backgroundColor: "#2d3748" }}>
                <div>
                  <nav>
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active text-white"
                          data-toggle="pill"
                          href="#pills-body-form"
                          onClick={(e) => {
                            setBody("form");
                          }}
                        >
                          Form
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          data-toggle="pill"
                          href="#pills-body-raw"
                          onClick={(e) => {
                            setBody("raw");
                          }}
                        >
                          Raw
                        </a>
                      </li>
                    </ul>
                  </nav>
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
                    <textarea
                      className="form-control shadow-none border-0 body-raw bg-secondary"
                      cols="30"
                      rows="9"
                      style={{ color: "#212121", resize: "none", height: "100%" }}
                      onChange={changeInputBodyRaw}
                      value={inputBodyRaw}
                    ></textarea>
                  </>
                )}
              </div>
            </div>
          </Flex>
        </Flex>
        {/* for main left section */}
        <Flex p={2} justifyContent='center' alignItems='center' h={containerHeight} w={panelWidth} overflow='hidden'>
          <Flex h='100%' w='100%'>
            <div className="card o-hidden border-0 text-white" style={{ borderRadius: "10px", backgroundColor: "#2d3748", width: "100%" }}>
              <div className="d-flex card-header border-0 flex-column p-2" style={{ backgroundColor: "#2d3748" }}>
                <div className="d-flex justify-content-between">
                  <span>Response</span>
                  <span></span>
                </div>
                <div>
                  Status: <span className="text-success">{resultHeader.status}</span>&nbsp; Time:&nbsp;<span className="text-success">{resultHeader.responseTime}</span>
                </div>
              </div>
              <Flex p={2} overflow='hidden' w='100%' h='100%'>
                <Flex p={1} className='card-body' overflow='scroll' borderRadius={8} w='100%' bgColor='gray.800'>
                  {
                    !resultPanel ? <></> :
                    <ReactJson src={resultPanel} indentWidth={1} theme='colors' enableClipboard={false} iconStyle='square' displayDataTypes={false} style={{backgroundColor: '#1A202C'}} name={false} collapseStringsAfterLength={20}/>
                  }
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
