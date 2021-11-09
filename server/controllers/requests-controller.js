const { default: axios } = require('axios');

class RequestsController {
  static async requestApi(req, res, next) {
    try {
      const { url, params, headers, bodies, method } = req.body;

      if (params) {
        let processedParams = {};

        params.forEach((param) => {
          processedParams[param.key] = param.value;
        });

        console.log(processedParams);
      }

      let axiosOptions = {
        url,
        method,
        // params: processedParams,
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

      res.status(200).json({
        response: response.data,
        responseTime:
          new Date().getTime() - response.config.meta.requestStartedAt,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RequestsController;
