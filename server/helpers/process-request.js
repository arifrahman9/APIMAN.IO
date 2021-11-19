const process = (requestValue) => {
  let processedRequestValue = {};

  requestValue.forEach((el) => {
    processedRequestValue[el.key] = el.value;
  });

  return processedRequestValue;
};

module.exports = process;
