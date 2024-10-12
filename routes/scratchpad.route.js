import express from "express";

import { createScratchPad, deleteScratchPad, getScratchPads, updateScratchPad } from "../controllers/scratchpad.controller.js";

const router = express.Router();

router.get("/", getScratchPads);
router.post("/", createScratchPad);
router.put("/:id", updateScratchPad);
router.delete("/:id", deleteScratchPad);

export default router;
