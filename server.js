const express = require('express');
const app = express();
const sequelize = require('./config/db');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const roleRoutes = require('./routes/roleRoutes');
require('dotenv').config();

const cors = require("cors");



const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(fileUpload());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/notice', noticeRoutes);
app.use('/api/roles', roleRoutes);




const port = 5500;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});