import express from "express";

import {
  createScratchpad,
  deleteScratchpad,
  getScratchpads,
  updateScratchpad,
} from "../controllers/scratchpad.controller.js";

const router = express.Router();

router.get("/", getScratchpads);
router.post("/", createScratchpad);
router.put("/:id", updateScratchpad);
router.delete("/:id", deleteScratchpad);

export default router;
