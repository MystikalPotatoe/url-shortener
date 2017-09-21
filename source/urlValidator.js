'use strict';

const urlValidator = (myUrl) => {
    if (!myUrl.match(/(^https*:\/\/)+(www\.)?\S*/)) {
        return false;
    }
    return true;
};

 export default urlValidator;