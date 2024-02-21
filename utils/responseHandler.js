module.exports = {
    sendResponse: function (res, success, message, data, status) {
        console.log(`[RESPONSE] ${success} | ${message} | ${status}`);

        // console.log(res, "d");
        res.status(status || 200).json({
            success: success,
            message: message,
            data: data,
            status: status,
        });
    },
};
