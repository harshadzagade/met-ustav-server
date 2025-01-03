const UserEvents = require("../models/UserEvents");
const User = require("../models/User");
const Event  = require("../models/Event");
const Category = require("../models/Category");

const userEventsController = {
  // Create User Event Application
  createUserEvent: async (req, res) => {
    try {
      const { userId, eventId, categoryId, fileUrl,  addBy } = req.body;

       // Validate if Event model is defined
       if (!Event) {
        return res.status(500).json({ message: "Event model is not defined. Check imports." });
    }

      // Get the date of the event the user is trying to apply for
      const newEvent = await Event.findByPk(eventId);
      if (!newEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Check if user is already registered for the event
      const existingUserEvent = await UserEvents.findOne({
        where: { userId, eventId },
      });

      if (existingUserEvent) {
        return res.status(400).json({ message: "User already registered for the event" });
      }

      // Create the user event application
      const userEvent = await UserEvents.create({
        userId,
        eventId,
        categoryId,
        fileUrl,
        status: "Submitted",
        addBy,
      });

      res.status(201).json(userEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get All User Events
  getAllUserEvents: async (req, res) => {
    try {
      const userEvents = await UserEvents.findAll({
        include: [
          { model: User , as: "Users"},
          { model: Event , as: "Events"},
          { model: Category , as: "Categories"},
        ],
      });
      res.json(userEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get User Event By ID
  getUserEventById: async (req, res) => {
    try {
      const id = req.params.id;
      const userEvent = await UserEvents.findByPk(id, {
        include: [
          { model: User , as: "Users"},
          { model: Event , as: "Events"},
          { model: Category , as: "Categories"},
        ],
      });

      if (!userEvent) {
        return res.status(404).json({ message: "User event not found" });
      }

      res.json(userEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update User Event
  updateUserEvent: async (req, res) => {
    try {
      const id = req.params.id;
      const userEvent = await UserEvents.findByPk(id);
  
      if (!userEvent) {
        return res.status(404).json({ message: "User event not found" });
      }
  
      Object.assign(userEvent, req.body); // Update fields dynamically
  
      // Save the updated userEvent
      await userEvent.save();
  
      // Check the status and update the user's role
      const userId = userEvent.userId; // Assuming userEvent has a userId field
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (userEvent.status === "Selected") {
        user.role = "Participant";
      } else if (["Rejected", "Submitted"].includes(userEvent.status)) {
        user.role = "User";
      }
  
      await user.save();
  
      res.json({ userEvent, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete User Event
  deleteUserEvent: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await UserEvents.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "User event not found" });
      }

      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // get to know user is already register for the event or not 
  getUserEventByUserIdAndEventId: async (req, res) => {
    try {
      const { userId, eventId } = req.params;
      const userEvent = await UserEvents.findOne({
        where: { userId, eventId },
      });
      if (!userEvent) {
        return res.status(404).json({ message: "User event not found" });
      }
      res.json(userEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userEventsController;
