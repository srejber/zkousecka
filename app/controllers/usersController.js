const usersModel = require('../models/usersModel');

exports.profile = (req, res) => {
    if (req.session.user)
        return res.render('users/index', {
            title: 'Profil'
        });
    return res.redirect('/users/login');
};
exports.deleteView = (req, res) => {
    if (req.session.user || usersModel.hasUser(req.session.user))
        return res.render('users/delete', {
            title: 'Odstranění účtu'
        });
    return res.redirect('/');
};
exports.delete = (req, res) => {
    let password = req.body.password || '';

    if (!req.session.user || !usersModel.hasUser(req.session.user))
        return res.redirect('/');

    if (password === '')
        return res.render('users/delete', {
            title: 'Odstranění účtu',
            error: 'Vyplňte všechny údaje!'
        });

    if (!usersModel.verifyPassword(req.session.user, password))
        return res.render('users/delete', {
            title: 'Odstranění účtu',
            error: 'Neplatné heslo!'
        });

    if (!req.session.user || !usersModel.hasUser(req.session.user))
        return res.redirect('/');

    usersModel.deleteUser(req.session.user);
    req.session.destroy();

    return res.redirect('/');
};

exports.loginView = (req, res) => {
    return res.render('users/login', {
        title: 'Přihlášení'
    });
};
exports.login = (req, res) => {
    let username = req.body.username || '';
    let password = req.body.password || '';

    if (username === '' || password === '')
        return res.render('users/login', {
            title: 'Přihlášení',
            error: 'Vyplňte všechny údaje!'
        });

    if (password.length < 8)
        return res.render('users/login', {
            title: 'Přihlášení',
            error: 'Heslo musí mít alespoň 8 znaků!'
        });

    if (!usersModel.hasUser(username) || !usersModel.verifyPassword(username, password))
        return res.render('users/login', {
            title: 'Přihlášení',
            error: 'Neplatné jméno nebo heslo!'
        });

    req.session.user = username;
    return res.redirect('/users/profile');
};

exports.signupView = (req, res) => {
    return res.render('users/signup', {
        title: 'Registrace'
    });
};
exports.signup = (req, res) => {
    let username = req.body.username || '';
    let email = req.body.email || '';
    let password = req.body.password || '';
    let passwordCheck = req.body.passwordCheck || '';
    let agreement = req.body.agreement || '';

    if (username === '' || email === '' || password === '' || passwordCheck === '') {
        return res.render('users/signup', {
            title: 'Registrace',
            error: 'Vyplňte všechny údaje!'
        });
    }

    if (password !== passwordCheck) {
        return res.render('users/signup', {
            title: 'Registrace',
            error: 'Hesla se neshodují!'
        });
    }

    if (password.length < 8) {
        return res.render('users/signup', {
            title: 'Registrace',
            error: 'Heslo musí mít alespoň 8 znaků!'
        });
    }

    if (agreement !== 'on') {
        return res.render('users/signup', {
            title: 'Registrace',
            error: 'Musíte souhlasit s podmínkami!'
        });
    }

    if (usersModel.hasUser(username))  {
        return res.render('users/signup', {
            title: 'Registrace',
            error: 'Uživatel již existuje!'
        });
    }

    usersModel.registerUser(username, email, password);
    return res.redirect('/users/login');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};