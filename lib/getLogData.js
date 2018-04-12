const User = require('../models/User');

const getLogData = (email, duration) => new Promise(async (resolve, reject) => {

    console.log('enter get log data.');

    try {
        const result = await User.getLogDataWithDuration(email, duration);
        console.log('get log data result : ');
        console.log(result);

        if (!result) throw new Error('no results found.');
        resolve(result);
    } catch (e) {
        console.log('error occured in get log data.');
        console.log(e);
        reject(e);
    }
});

module.exports = getLogData;