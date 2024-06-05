import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    type: { type: String, required: true },
    cuisine: { type: String, required: true },
    occasion: { type: String, required: true },
    name: { type: String, required: true },
});

const Menu = mongoose.model('menu', menuSchema);

export default Menu;
