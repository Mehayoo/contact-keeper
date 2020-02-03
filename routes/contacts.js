const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    }); //the most recent contacts first
    res.json(contacts);
  } catch (err) {
    console.error(res.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message), res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@route    DELETE api/contact/:id
//@desc     Delete contact
//@access   Private
router.delete("/:_id", (req, res) => {
  // User.findByIdAndRemove(req.params._id, function(err, user) {
  //   if (err)
  //     return res.status(500).send("There was a problem deleting the user.");
  //   res.status(200).send("User: " + user.name + " was deleted.");
  // });

  res.send("Delete contact");
});

module.exports = router;
