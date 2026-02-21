import express from 'express';

const router = express.Router();

//route
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

export default router;
