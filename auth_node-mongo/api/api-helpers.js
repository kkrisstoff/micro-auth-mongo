var helpers = {};

helpers.isNamePassCorrect = function (obj) {
    var name = obj.name || null,
        pass = obj.pass || null;

    return name && pass && name.length && pass.length ? true : false;
};
helpers.haveToRun = function (obj) {
    var run = obj.run? !!+obj.run : false,
        isDataCorrect = this.isNamePassCorrect(obj);

    return run && isDataCorrect ? true : false;
};

exports.helpers = function () {
    return helpers;
};