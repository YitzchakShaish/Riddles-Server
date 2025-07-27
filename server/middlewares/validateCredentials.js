
export function validateUsername(req, res, next) {
  const { username, password } = req.body;

  if (
    !username || typeof username !== 'string' || username.trim() === '' 
  ) {
    return res.status(400).json({ message: 'Invalid or missing username' });
  }

  next();
}

export function validatePassword(req, res, next) {
  const { password } = req.body;

  if (
    !password || typeof password !== 'string' || password.trim() === '' 
  ) {
    return res.status(400).json({ message: 'Invalid or missing password.' });
  }

  next();
}
