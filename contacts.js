const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsingData = JSON.parse(data);

    return parsingData;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf-8");

    const parsingList = JSON.parse(contactsList);
    const contactById = parsingList.filter(
      (contact) => contact.id === contactId
    );

    return contactById[0];
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
      return false; // no contact found
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );

    return true; // contact removed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const id = (Math.random() * 10 ** 17).toString();
    const newContact = { id, name, email, phone };

    contacts.push(newContact);

    const jsonData = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, jsonData, "utf-8");

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(id, body) {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex !== -1) {
      contacts[contactIndex] = { id, name, email, phone };
      const jsonData = JSON.stringify(contacts);
      await fs.writeFile(contactsPath, jsonData, "utf-8");
      return contacts[contactIndex];
    }

    return null; // Contact with the given id was not found
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
