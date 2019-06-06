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

const elementWithAttributeNotDisabled = (element, attribute, attributeValue) => {
    return !element.attr('disabled') && element.attr(attribute) === attributeValue;
}

exports.existy = existy
exports.truthy = truthy
exports.getCreds = getCreds
exports.elementWithAttributeNotDisabled = elementWithAttributeNotDisabled
