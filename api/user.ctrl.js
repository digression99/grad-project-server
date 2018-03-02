
exports.registerUser = (req, res) => {
    res.status(200).json({
        message : "registerUser"
    });
};

exports.getFaces = (req, res) => {
    res.status(200).json({
        message : "getFaces"
    })
};

exports.faceRegister = (req, res) => {
    res.status(200).json({
        message : "faceRegister"
    })
};

exports.faceDetect = (req, res) => {
    res.status(200).json({
        message : "faceDetect"
    })
};