const { default: axios } = require('axios');
const process = require('../helpers/process-request');
const HistoriesModel = require('../models/histories-model');
const RequestsModel = require('../models/requests-model');

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
          bodies = process(bodies);
        } else {
          bodies = JSON.parse(bodies);
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

      const newAddedHistory = await HistoriesModel.addNewHistory(
        url,
        params,
        headers,
        bodies,
        method,
        req.user.id
      );

      res.status(200).json({
        status: `${response.request.res.statusCode} ${response.request.res.statusMessage}`,
        response: response.data,
        responseTime:
          new Date().getTime() - response.config.meta.requestStartedAt,
        newAddedHistory,
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

  static async readRequests(req, res, next) {
    try {
      let requests = JSON.parse(req.file.buffer.toString());

      const newAddedRequests = await RequestsModel.addNewRequest(
        requests,
        req.user.id
      );

      res.status(200).json(newAddedRequests);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RequestsController;
