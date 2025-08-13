const Video = require("../../model/videoModel/video");
const fs = require("fs");
const path = require("path");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file || !req.body.title)
      return res.status(400).json({ success: false, message: "Title & video required!" });

    const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.customPath}/${req.file.customFilename}`;

    const video = new Video({
      title: req.body.title,
      url: videoUrl,
      filename: req.file.customFilename,
    });

    await video.save();
    res.json({ success: true, message: "Video uploaded successfully ✅", data: video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ success: true, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });

    const filePath = path.join(__dirname, "../../uploads/video", video.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Video.findByIdAndDelete(id);
    res.json({ success: true, message: "Video deleted ✅" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });

    if (req.body.title) video.title = req.body.title;

    if (req.file) {
      const oldPath = path.join(__dirname, "../../uploads/video", video.filename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      video.filename = req.file.customFilename;
      video.url = `${req.protocol}://${req.get("host")}/uploads/${req.file.customPath}/${req.file.customFilename}`;
    }

    await video.save();
    res.json({ success: true, message: "Video updated ✅", data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
