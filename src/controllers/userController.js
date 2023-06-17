const router = require('express').Router();

const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelpers');


router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);

        res.cookie('token', token);

        res.redirect('/');
        
    } catch(err) {
        res.render('users/login', { error: getErrorMessage(err) });
    }
    

});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        await userManager.register({ username, email, password, repeatPassword });

        res.redirect('/users/login');

    } catch (err) {
        res.render('users/register', { errror: getErrorMessage(err) });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;