/**
 * 简单的命令管理集合
 */

var defaultOptions = {
    port: 8080,
    debug: false
};

module.exports = {
    getArgs: function () {
        var args;
        try {
            args = process.argv.slice(2);
        }
        catch (ex) {
            args = [];
        }

        return args;
    },

    get: function (name) {
        var defaultValue = defaultOptions[name];
        var args = this.getArgs();

        return args.indexOf(name) > -1 ? true : defaultValue;
    },

    getValue: function (name) {
        var defaultValue = defaultOptions[name];
        var args = this.getArgs();

        var index = args.indexOf(name);
        index = index > -1 ? index + 1 : index;

        return args[index] || defaultValue;
    }
};
