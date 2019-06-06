const _ = require('underscore');

const existy = (x) => {
    return x != null;
}

const truthy = (x) => {
    return (x !== false) && existy(x)
}

const getCreds = (users, username) => {
    const user = _.findWhere(users, {username: username})
    return _.toArray(_.pick(user, ['email', 'password']))
}

const inputIsNotDissabled = (element, inputType) => {
    return !element.attr('disabled') && element.attr('type') === inputType;
}

exports.existy = existy
exports.truthy = truthy
exports.getCreds = getCreds
exports.inputIsNotDissabled = inputIsNotDissabled
