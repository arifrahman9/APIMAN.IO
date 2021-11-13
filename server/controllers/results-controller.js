const ResultsModel = require("../models/results-model")

class ResultsController {
  static async getAllResults(req, res, next) {
    try {
      const results = await ResultsModel.getResultsByUserId(req.user.id)

      res.status(200).json(results)
    } catch (err) {
      next(err)
    }
  }

  static async addNewResult(req, res, next) {
    try {
      const { content, status, code, responseTime, responseSize } = req.body
      if (!content || !status || !code || !responseTime || !responseSize) {
        throw { name: "resultFieldEmpty" }
      }

      await ResultsModel.addNewResult(content, status, code, Number(responseTime), responseSize, req.user.id)
      const newResult = await ResultsModel.getLastInsertedResult()
      res.status(201).json(newResult)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getResultById(req, res, next) {
    try {
      const { id } = req.params
      const foundResult = await ResultsModel.getResultsById(id)
      if (!foundResult) {
        throw new Error()
      }
      res.status(200).json(foundResult)
    } catch (err) {
      next(err)
    }
  }

  static async deleteResultById(req, res, next) {
    try {
      const { id } = req.params
      const deletedResult = await ResultsModel.deleteResultById(id)

      if (!deletedResult) {
        throw new Error()
      }

      res.status(200).json(deletedResult)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = ResultsController
