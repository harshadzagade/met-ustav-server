const Event = require("../models/Event");
const Category = require("../models/Category");
const path = require("path");
const fs = require("fs");

const eventController = {
  createEvent: async (req, res) => {
    try {
      // Extract data from request
      const {
        name,
        date,
        fromTime,
        toTime,
        location,
        aboutEvent,
        instructions,
        contactPerson,
        contactEmail,
        contactNumber,
        banner,
        addBy,
        categoryId,
      } = req.body;

      // Check if files are provided
      // const bannerFile = req.files?.banner; // 'banner' is the key from the client

      // // Set up upload directory
      // const uploadDir = path.join(__dirname, "../uploads/");
      // if (!fs.existsSync(uploadDir)) {
      //   fs.mkdirSync(uploadDir, { recursive: true });
      // }

      // // Save banner
      // let bannerPath = null;
      // if (bannerFile) {
      //   const bannerFilename = bannerFile.name;
      //   bannerPath = `/uploads/${bannerFilename}`;
      //   const bannerFullPath = path.join(uploadDir, bannerFilename);
      //   await bannerFile.mv(bannerFullPath); // Move file to destination
      // }


      // Save event to database
      const event = await Event.create({
        name,
        date,
        fromTime,
        toTime,
        location,
        aboutEvent,
        instructions,
        contactPerson,
        contactEmail,
        contactNumber,
        banner,
        categoryId,
        addBy,
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Read
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: [{ model: Category, as: "Category" }],
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const id = req.params.id;
      const event = await Event.findByPk(id, {
        include: [{ model: Category, as: "Category" }], // include associated category
      });
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        res.json(event);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update
  updateEvent: async (req, res) => {
    try {
      const id = req.params.id;
      const event = await Event.findByPk(id);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
      } else {
        const updateEvent = await event.update(req.body);
        await updateEvent.save();
        res.json(updateEvent);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete
  deleteEvent: async (req, res) => {
    try {
      const id = req.params.id;
      await Event.destroy({ where: { id } });
      res.status(204).json({ message: "Event deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = eventController;
