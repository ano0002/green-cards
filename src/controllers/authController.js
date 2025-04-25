const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.sendFile('login.html', { root: './public' });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.redirect('/login?error=1');
        }
        
        req.session.userId = user._id;
        req.session.username = user.username;
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/login?error=2');
    }
};

exports.getRegister = (req, res) => {
    res.sendFile('register.html', { root: './public' });
};

exports.postRegister = async (req, res) => {
    const { username, password, confirm_password } = req.body;
    
    if (password !== confirm_password) {
        return res.redirect('/register?error=1');
    }
    
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        
        req.session.userId = newUser._id;
        req.session.username = newUser.username;
        res.redirect('/profile');
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error
            return res.redirect('/register?error=2');
        }
        console.error(err);
        res.redirect('/register?error=3');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
};