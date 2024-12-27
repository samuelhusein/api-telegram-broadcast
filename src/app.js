const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes');
const telegramRoutes = require('./routes/telegramRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/template', templateRoutes);
// app.use('/telegram', telegramRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});