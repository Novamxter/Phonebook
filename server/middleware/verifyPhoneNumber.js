export const verifyPhoneNumber = (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const digitRegex = /^\d+$/;
  if (!digitRegex.test(phone)) {
    return res.status(400).json({ error: "Phone number must contain only digits" });
  }

  if (phone.length !== 10) {
    return res.status(400).json({ error: "Phone number must be 10 digits long" });
  }
  next();
};
