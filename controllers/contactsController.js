const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../contacts");

async function getContacts(req, res) {
  const contacts = await listContacts();

  if (contacts) {
    return res.status(200).json(contacts);
  }

  return res.status(400).json({ status: "can't catch contacts" });
}

async function getYourContactById(req, res) {
  const { id } = req.params;
  const contactById = await getContactById(id);

  if (contactById?.name?.length > 0) {
    console.log(contactById);
    return res.status(200).json({ contactById });
  }
  return res.status(400).json({ message: `Contact with id: ${id} not found!` });
}

async function addYourContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const addedContact = await addContact(name, email, phone);

    return res
      .status(200)
      .json({ status: "Success, contact added!", contact: addedContact });
  } catch (err) {
    return res.status(400).json({ status: err });
  }
}

async function changeContact(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedContact = await updateContact(id, body);

    if (updatedContact === null) {
      return res
        .status(404)
        .json({ status: `Failure! Contact with id: ${id} not found!` });
    }

    res.json({ status: "Success, contact changed!", contact: updatedContact });
  } catch (err) {
    res.status(400).json({ message: "Can not change the contact" });
  }
}

const patchContact = (req, res) => {
  const { topic, text } = req.body;

  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic;
      }
      if (text) {
        post.text = text;
      }
    }
  });
  res.json({ status: "success" });
};

async function deleteContact(req, res) {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    return res
      .status(404)
      .json({ status: `Failure! Contact with id: ${id} not found!` });
  }
  return res
    .status(200)
    .json({ status: `Success! Contact with id: ${id} has been removed!` });
}

module.exports = {
  getContacts,
  getYourContactById,
  addYourContact,
  changeContact,
  patchContact,
  deleteContact,
};
