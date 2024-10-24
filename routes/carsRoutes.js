const express = require("express")
const carsRouter = express.Router()
const db = require("../database")

carsRouter.get("/test", (req, res) => {
	res.json({
		msg: "cars route test ok !!",
	})
})

// GET return a list of all cars
carsRouter.get("/", (req, res) => {
	db.all("SELECT * FROM cars", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
})

// POST add a new car
carsRouter.post("/", (req, res) => {
	const { carName, carYear, carImage } = req.body

	db.run(
		"INSERT INTO cars (carName, carYear, carImage) VALUES (?, ?, ?)",
		[carName, carYear, carImage],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.json({ id: this.lastID })
			}
		}
	)
})

// PUT update a car based on the param id
carsRouter.put("/:id", (req, res) => {
	const { id } = req.params
	console.log(id)

	db.run(
		"UPDATE cars SET carName = ?, carYear = ?, carImage = ? WHERE id = ?",
		[carName, carYear, carImage, id],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.json({ changes: this.changes })
			}
		}
	)
})

// DELETE delete a car based on the param id
carsRouter.delete("/:id", (req, res) => {
	res.json({
		msg: "update a car based on its id ... ",
	})
})

// GET one car based on its id
carsRouter.get("/:id", (req, res) => {
	const { id } = req.body
	db.get("SELECT * FROM cars WHERE id = ?", [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			// if now car found with that id
			if (!row) return res.status(404).json({ msg: "car not found" })
			// car found ✅
			res.json(row)
		}
	})
})

module.exports = carsRouter
