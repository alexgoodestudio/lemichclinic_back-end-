function emptyContactForm(req, res, next) {
    const { name, email, phone, message } = req.body.data || {};
  
    if (!name || !email || !message) {
      return next({
        status: 400,
        message: "Name, email, and message are required fields.",
      });
    }
  
    res.locals.email_address = email;
    next();
  }
  
  module.exports = emptyContactForm;
  