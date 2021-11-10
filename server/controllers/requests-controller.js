const { default: axios } = require('axios');
const process = require('../helpers/process-request');

class RequestsController {
  static async requestApi(req, res) {
    try {
      let { url, params, headers, bodies, method, bodyIsRaw } = req.body;

      if (params) {
        params = process(params);
      }

      if (headers) {
        headers = process(headers);
      }

      if (bodies) {
        if (!bodyIsRaw) {
          // let processedBodies = {};

          // bodies.forEach((body) => {
          //   processedBodies[body.key] = body.value;
          // });

          bodies = process(bodies);
        }
      }

      let axiosOptions = {
        url,
        method,
        params,
        data: bodies,
        headers,
      };

      axios.interceptors.request.use((response) => {
        response.meta = response.meta || {};
        response.meta.requestStartedAt = new Date().getTime();
        return response;
      });

      axios.interceptors.response.use((response) => {
        return response;
      });

      const response = await axios(axiosOptions);

      console.log(response);

      res.status(200).json({
        status: `${response.request.res.statusCode} ${response.request.res.statusMessage}`,
        response: response.data,
        responseTime:
          new Date().getTime() - response.config.meta.requestStartedAt,
      });
    } catch (err) {
      res.status(err.response.status).json({
        status: `${err.response.status} ${err.response.statusText}`,
        response: err.response.data,
        responseTime:
          new Date().getTime() - err.response.config.meta.requestStartedAt,
      });
    }
  }
}

module.exports = RequestsController;
