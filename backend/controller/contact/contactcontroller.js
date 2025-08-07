const Contact = require('../../model/contactform/contactformschema');

// POST: Save contact
const contactController = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        await newContact.save();

        res.status(201).json({ success: true, message: "Contact saved successfully!" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ success: false, message: "Error saving contact", error });
    }
};

// GET: Fetch all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ success: false, message: "Error fetching contacts", error });
    }
};
cons

module.exports = { contactController, getContacts };
