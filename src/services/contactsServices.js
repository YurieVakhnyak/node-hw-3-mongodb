const { Contact } = require("../../db/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};
const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(`Failure, no contacts with ${id} found!`);
  }
  return contact;
};
const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};
const updateContact = async (id, { name, email, phone, favorite }) => {
  await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};
const partChangeContact = async (id, { name, email, phone, favorite }) => {
  await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};
const removeContact = async (id) => {
  await Contact.findByIdAndRemove(id);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  partChangeContact,
};
