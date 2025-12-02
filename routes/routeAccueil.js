import express from 'express';

const router = express.Router();

//route
router.get('/', (req, res) => {
    res.render('index');
});

export default router;
