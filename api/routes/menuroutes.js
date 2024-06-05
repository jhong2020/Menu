import express from 'express';
import Menu from '../models/menu.js';

const router = express.Router();

// GET 요청을 처리하는 라우트
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST 요청을 처리하는 라우트
router.post('/', async (req, res) => {
  const menu = new Menu({
    type: req.body.type,
    cuisine: req.body.cuisine,
    occasion: req.body.occasion,
    name: req.body.name,
  });

  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
