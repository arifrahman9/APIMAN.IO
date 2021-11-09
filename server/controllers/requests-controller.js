const { default: axios } = require('axios');

class RequestsController {
  static async requestApi(req, res, next) {
    try {
      const { url, params, headers, bodies, method } = req.body;
      let axiosOptions;

      switch (method) {
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
          axiosOptions = {
            method,
            url,
            params,
            data: bodies,
            headers,
          };
          break;

        default:
          axiosOptions = {
            url,
            method,
          };
          break;
      }

      const response = await axios(axiosOptions);

      console.log(response);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = RequestsController;
