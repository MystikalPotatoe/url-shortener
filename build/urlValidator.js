'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var urlValidator = function urlValidator(myUrl) {
    if (!myUrl.match(/(^https*:\/\/)+(www\.)?\S*/)) {
        return false;
    }
    return true;
};

exports.default = urlValidator;