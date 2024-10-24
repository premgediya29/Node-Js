const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const contact = new Contact({ name, email, phone, userId: req.userId });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
