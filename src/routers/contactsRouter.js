const express = require("express");
const router = new express.Router();

const {
  addContactValidation,
  patchContactValidation,
} = require("../middleware/validationMiddleware");

const {
  getContacts,
  getYourContactById,
  addYourContact,
  changeContact,
  patchContact,
  deleteContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);
router.get("/:id", getYourContactById);
router.post("/", addContactValidation, addYourContact);
router.put("/:id", addContactValidation, changeContact);
router.patch("/:id", patchContactValidation, patchContact);
router.delete("/:id", deleteContact);
router.use((req, res) => {
  res.status(404).json({ status: "Page not found..." });
});

module.exports = { contactRouter: router };
