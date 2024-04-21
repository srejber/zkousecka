const bcrypt = require('bcryptjs');
const jsondb = require('simple-json-db');
const db = new jsondb('./data/usersData.json');
const fs = require('fs');

createStructure = () => {
    if (!fs.existsSync('./data')) fs.mkdirSync('./data');
    if (!fs.existsSync('./data/usersData.json')) {
        console.warn('UPOZORNĚNÍ: Soubor s uživatelskými daty neexistuje, vytvářím nový.');
        fs.writeFileSync('./data/usersData.json', '{}')
    };
};

exports.verifyPassword = (username, passHash) =>
    bcrypt.compareSync(passHash, db.get(username).passHash);

exports.registerUser = (username, email, password) => {
    username = username.replace(/(<([^>]+)>)/ig, "");

    db.set(username, {
        email: email,
        passHash: bcrypt.hashSync(password)
    });

    return true;
}

exports.hasUser = (username) => db.has(username);

exports.getUser = (username) => db.get(username);

exports.deleteUser = (username) => {
    db.delete(username);
    db.sync();
    return true;
}

createStructure();
