const FCM = require('fcm-node');
// const clientToken = 'ctdILQHZApY:APA91bFjPx5oJmsD8MpfWwIwruHaNGc7jfKLYEAGWxONhWpWCgBwgD0KcdO-kg_lnRCr23m9Xw_Ae75rP3VjJZuhfcmVI9Gli9lk_H3AMbTnSPPnjvOCaSQtO1RGcXrreb1jSQt65DdW';
const serverKey = 'AAAAWam5RW8:APA91bEYYfff03JurPSHkXtOyXk_z7_WkcjPLjSToEnwKMtBBojlkBiORXqcRO61LSVfrj6Q4uU34l6BGS-YWE7sSr6rR5PxQe-SuSVY784odJ9lV_2LuYFHaP-ShdmDg36AAKQQx07w';

const fcm = new FCM(serverKey);

module.exports = fcm;