const _ = require('underscore');

const existy = (x) => {
    return x != null;
}

const truthy = (x) => {
    return (x !== false) && existy(x)
}

const cat = () => {
    const head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

const construct = (head, tail) => {
    return cat([head], _.toArray(tail));
}

const project = (table, keys) => {
    return _.map(table, (obj) => {
        return _.pick.apply(null, construct(obj, keys));
    })
}

const rename = (obj, newNames) => {
    return _.reduce(newNames, (o, nu, old) => {
        if (_.has(obj, old)) {
            o[nu] = obj[old];
            return o;
        }
        else
            return o;
    },
    _.omit.apply(null, construct(obj, _.keys(newNames))));
}

const as = (table, newNames) => {
    return _.map(table, (obj) => {
        return rename(obj, newNames);
    });
}

const restrict = (table, pred) => {
    return _.reduce(table, (newTable, obj) => {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table)
}

const getUserCreds = (users, username) => {
    return _.first(
        restrict(
            project(
                as(users, {username: 'username'}),
                ['username', 'password']
            ),
            (user) => {
                return user.username === username
            }
        )
    )
}

exports.existy
exports.truthy
exports.getUserCreds