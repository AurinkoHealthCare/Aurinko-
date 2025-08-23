const Faculty = require("../../model/facultyModel/faculty");
const fs = require("fs");
const path = require("path");

const baseUrl = (req) => `${req.protocol}://${req.get("host")}`;

// Create faculty
const createFaculty = async (req, res) => {
  try {
    const { name, designation, bio } = req.body;

    const parsedName = JSON.parse(name);
    const parsedDesignation = JSON.parse(designation);
    const parsedBio = JSON.parse(bio);

    let image = null;
    if (req.file) {
      image = {
        url: `${baseUrl(req)}/uploads/${req.file.customPath}/${req.file.customFilename}`,
        filename: req.file.originalname,
      };
    }

    const newFaculty = await Faculty.create({
      name: parsedName,
      designation: parsedDesignation,
      bio: parsedBio,
      image,
    });

    res.status(201).json(newFaculty);
  } catch (err) {
    console.error("Create Faculty Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all faculty
const getFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculties);
  } catch (err) {
    console.error("Get Faculty Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update faculty
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, bio } = req.body;

    const faculty = await Faculty.findById(id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });

    if (name) faculty.name = JSON.parse(name);
    if (designation) faculty.designation = JSON.parse(designation);
    if (bio) faculty.bio = JSON.parse(bio);

    if (req.file) {
      // delete old image if exists
      if (faculty.image && faculty.image.url) {
        const oldPath = path.join(__dirname, "../../../uploads", faculty.image.url.split("/uploads/")[1]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      faculty.image = {
        url: `${baseUrl(req)}/uploads/${req.file.customPath}/${req.file.customFilename}`,
        filename: req.file.originalname,
      };
    }

    await faculty.save();
    res.json(faculty);
  } catch (err) {
    console.error("Update Faculty Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });

    if (faculty.image && faculty.image.url) {
      const filePath = path.join(__dirname, "../../../uploads", faculty.image.url.split("/uploads/")[1]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Faculty deleted", id });
  } catch (err) {
    console.error("Delete Faculty Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createFaculty, getFaculty, updateFaculty, deleteFaculty };
