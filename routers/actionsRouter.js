const express = require("express");
const router = express.Router();

// const Projects = require('../data/helpers/projectModel.js');
const Actions = require("../data/helpers/actionModel.js");

router.use(express.json());

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({ error: "Server could not GET actions" });
    });
});

router.post("/", (req, res) => {
  const { description, notes } = req.body;
  if (!description || !notes) {
    res.status(404).json({ error: "Must have description and notes." });
  } else {
    Actions.insert()
      .then(action => {
        res.status(201).json(action);
      })
      .catch(() => {
        res.status(500).json({ error: "Server could not create action." });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!body) {
    res.status(404).json({ error: "Action does not exist." });
  } else {
    Actions.remove(id)
      .then(() => {
        res.status(201).json({ message: "Removed" });
      })
      .catch(() => {
        res.status(500).json({ error: "Could not delete action." });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Actions.update(id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(400).json({ error: "Action does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update" });
    });
});

module.exports = router;
