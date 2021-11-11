const express = require("express")
const ResultsController = require("../controllers/results-controller")
const router = express.Router()

router.get("/", ResultsController.getAllResults)
router.post("/", ResultsController.addNewResult)
router.get("/:id", ResultsController.getResultById)
router.delete("/:id", ResultsController.deleteResultById)

module.exports = router
