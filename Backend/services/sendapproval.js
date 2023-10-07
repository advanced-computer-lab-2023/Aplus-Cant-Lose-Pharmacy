const { sendEmail } = require("../sendMailService");

const sendAccessRequestApprovalEmail = async (email, title) => {
    const context = {
        Title: title,
        email: email
    };
    sendEmail(email, context, "phapproval", "El7a2ni pharmacy | Access Approved 🟩");
};

module.exports = { sendAccessRequestApprovalEmail };
