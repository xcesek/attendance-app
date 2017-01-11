
var randomstring = require("randomstring");


module.exports = {
    getThinkingResponse: function (res) {
        var str = randomstring.generate({
            length: 5,
            charset: 'alphabetic'
        });
        res.write(str);
        res.end();
    },

    getResponse: function (res) {
        var str = 'Sure thing!'
        res.write(str);
        res.end();
    }
};