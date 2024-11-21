const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})


// MongoDB connection (without deprecated options)
const DB_URI = 'mongodb+srv://rpurushotham0143:1234@cluster0.ivuxpys.mongodb.net/potfolio?retryWrites=true&w=majority&appName=Cluster0'; // Your MongoDB URI
mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema for the form data
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Model for the collection
const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/contactme', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        const newContact = new Contact({ name, phone, email, message });
        await newContact.save();
        res.send("Data Sent Successfully <a href='/'>Go To Home</a>");
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
