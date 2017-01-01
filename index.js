var fs = require('fs');
var path = require('path');
var settings = {
    defaultLang: 'en',
    directory: './locales',
    queryParam: 'lang',
    cookie: 'lang',
    aliasLangName: 'langName',
    aliasTxt: 'strs'
};

module.exports = {
    configure: function (data) {
        settings = Object.assign({},settings, data);
    },
    load: function (req, res, next) {
        var lang = settings.defaultLang;
        var cookie = req.cookies[settings.cookie];
        if(cookie !== undefined) {
            lang = cookie;
        }
        req[settings.aliasLangName] = lang;
        var pathToFile = path.resolve('.', 'locales', lang + '.js');
        if(fs.existsSync(pathToFile)){
            req[settings.aliasTxt] = require(pathToFile);
        } else {
            req[settings.aliasTxt] = require(path.resolve('.', 'locales', settings.defaultLang));
        }
        next();
    },

    switch: function (req, res, next) {
        var lang = req.query[settings.queryParam];
        var expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
        res.cookie('lang', lang, { expires: expiryDate, httpOnly: true });
        res.redirect('back');
    }
};
