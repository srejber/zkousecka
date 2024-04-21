const dotenv = require('dotenv');
dotenv.config();

if (process.env.PORT === undefined || process.env.SECRET === undefined)
    console.warn('CHYBA: Chybí konfigurace v souboru .env');

exports.port = process.env.PORT || 8000;
exports.secret = process.env.SECRET || 'tajny-retezec-pro-sifrovani';
