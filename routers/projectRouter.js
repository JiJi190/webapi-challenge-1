const express = require("express");
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();
router.use(express.json());

//Endpoints

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(() => {
      res.status(500).json({ error: "Server could not GET projects" });
    });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (name || description) {
    Projects.insert()
      .then(project => {
        res.status(201).json(project);
      })
      .catch(() => {
        res.status(500).json({ error: "Server could not POST" });
      });
  } else {
    res.status(404).json({ message: "Please provide name and description" });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ error: "That project doesn't even exist" });
  } else {
    Projects.remove(id)
      .then(() => {
        res.status(201).json();
      })
      .catch(500)
      .json({ error: "Server could not delete project." });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Projects.update(id, req.body)
    .then(project => {
      if (id) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server could not update." });
    });
});

module.exports = router;
