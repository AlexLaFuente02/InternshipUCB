const express = require("express");
const router = express.Router();
const analisisRiesgosService = require("../services/analisisRiesgosService");

router.get("/", async (req, res) => {
    const response = await analisisRiesgosService.getAll();
    res.json(response);
});

router.get("/:id", async (req, res) => {
    const response = await analisisRiesgosService.getById(req.params.id);
    res.json(response);
});

router.post("/", async (req, res) => {
    const response = await analisisRiesgosService.create(req.body);
    res.json(response);
});

router.put("/:id", async (req, res) => {
    const response = await analisisRiesgosService.update(req.params.id, req.body);
    res.json(response);
});

router.delete("/:id", async (req, res) => {
    const response = await analisisRiesgosService.remove(req.params.id);
    res.json(response);
});

module.exports = router;
