const Event = require('../models/Event');
const Category = require('../models/Category');

const eventController = {
  // Create
  createEvent: async (req, res) => {
    try {
      const event = await Event.create({
        name: req.body.name,
        date: req.body.date,
        banner: req.body.banner,
        poster: req.body.poster,
        addBy: req.body.addBy,
        categoryId: req.body.categoryId, // foreign key
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
        include: [{ model: Category, as: 'category' }], // include associated category
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