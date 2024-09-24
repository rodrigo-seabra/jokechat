const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');

const { trainNLP } = require('./services/nlpService');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, 
}));



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


trainNLP();

app.use('/api', chatRoutes);
app.use("/user", userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
