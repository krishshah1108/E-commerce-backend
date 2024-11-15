import mongoose from "mongoose";

const init_db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default init_db