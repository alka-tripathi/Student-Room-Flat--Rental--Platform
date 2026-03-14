const roomValidation = (req, res, next) => {
  const { title, location, price, description, contactNumber } = req.body;

  if (!title || !location || !price || !contactNumber) {
    return res.status(400).json({
      message: 'Title, location, price and contactNumber are required',
      success: false,
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      message: 'Price must be greater than 0',
      success: false,
    });
  }

  if (!/^[0-9]{10}$/.test(contactNumber)) {
    return res.status(400).json({
      message: 'Contact number must be 10 digits',
      success: false,
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      message: 'Description too long',
      success: false,
    });
  }

  next();
};

module.exports = roomValidation;
