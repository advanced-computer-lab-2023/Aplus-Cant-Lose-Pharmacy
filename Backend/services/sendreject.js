const { sendEmail } = require("./sendEmail");

const sendAccessRequestRejectionEmail = async (email, title) => {
    const context = {
        Title: title,
        email: email
    };
    sendEmail(email, context, "phreject", "El7a2ni pharmacy | Access Request Rejected 🟥");
};

module.exports = { sendAccessRequestRejectionEmail };