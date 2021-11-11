const process = (requestValue) => {
  let processedRequestValue = {};

  requestValue.forEach((el) => {
    processedRequestValue[el.key] = el.value;
  });

  return processedRequestValue;

  // params.forEach((param) => {
  //   processedParams[param.key] = param.value;
  // });

  // params = processedParams;
};

module.exports = process;
