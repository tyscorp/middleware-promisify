var _ = require('lodash');
var Promise = require('bluebird');

var promisify = function (handler, route) {
    if (_.isFunction(route)) {
        route = Promise.method(route);

        return function (req, res, next) {
            return handler(req, res, next, route(req, res, next));
        };
    }
    else if (_.isObject(route)) {
        return _.mapValues(route, _.partial(promisify, handler));
    }
    else {
        return route;
    }
};

module.exports = promisify;
