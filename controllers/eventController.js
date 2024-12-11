const Event = require('../models/Event');
const Category = require('../models/Category');
const path = require("path");
const fs = require("fs");

const eventController = {
  // Create
  // createEvent: async (req, res) => {
  //   try {
  //     const event = await Event.create({
  //       name: req.body.name,
  //       date: req.body.date,
  //       banner: req.body.banner,
  //       poster: req.body.poster,
  //       addBy: req.body.addBy,
  //       categoryId: req.body.categoryId, // foreign key
  //     });
  //     res.status(201).json(event);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // },

  createEvent: async (req, res) => {
    try {
      // Extract data from request
      const { name, date, addBy, categoryId } = req.body;
  
      // Check if files are provided
      const bannerFile = req.files?.banner; // 'banner' is the key from the client
      const posterFile = req.files?.poster; // 'poster' is the key from the client
  
      // Set up upload directory
      const uploadDir = path.join(__dirname, "../uploads/");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      // Save banner
      let bannerPath = null;
      if (bannerFile) {
        const bannerFilename = `${Date.now()}_${bannerFile.name}`;
        bannerPath = `/uploads/${bannerFilename}`;
        const bannerFullPath = path.join(uploadDir, bannerFilename);
        await bannerFile.mv(bannerFullPath); // Move file to destination
      }
  
      // Save poster
      let posterPath = null;
      if (posterFile) {
        const posterFilename = `${Date.now()}_${posterFile.name}`;
        posterPath = `/uploads/${posterFilename}`;
        const posterFullPath = path.join(uploadDir, posterFilename);
        await posterFile.mv(posterFullPath); // Move file to destination
      }
  
      // Save event to database
      const event = await Event.create({
        name,
        date,
        banner: bannerPath,
        poster: posterPath,
        addBy,
        categoryId,
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
        include: [{ model: Category, as: 'Category' }], 
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
        include: [{ model: Category, as: 'Category' }], // include associated category
      });
      if (!event) {
        res.status(404).json({ message: 'Event not found' });
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
        res.status(404).json({ message: 'Event not found' });
      } else {
        event.name = req.body.name;
        event.date = req.body.date;
        event.banner = req.body.banner;
        event.poster = req.body.poster;
        event.updateBy = req.body.updateBy;
        await event.save();
        res.json(event);
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
      res.status(204).json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = eventController;