const User = require('../models/User');

const getLogData = (email, duration) => new Promise(async (resolve, reject) => {

    console.log('enter get log data.');

    try {
        const result = await User.getLogDataWithDuration(email, duration);
        if (!result.length) throw new Error('no results found.');
        return result;
    } catch (e) {
        console.log('error occured in get log data.');
        console.log(e);
        reject(e);
    }
});

module.exports = getLogData;