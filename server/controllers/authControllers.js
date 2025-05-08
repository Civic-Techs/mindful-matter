const User = require('../db/models/User');

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    // Ensure the request body exists
    if (!req.body) {
      return res.status(400).send({ message: 'Request body is required.' });
    }

    // Extract required fields from the request body
    const { name, dob, bio, profile_img, email, username, password } = req.body;

    // Validate required fields
    if (!name || !dob || !email || !username || !password) {
      return res.status(400).send({
        message: 'Name, DOB, email, username, and password are required.',
      });
    }
    console.log(User);

    // Check if the username already exists
    // const existingUser = await User.findByUsername(username);
    // if (existingUser) {
    //   return res.status(409).send({ message: 'Username already exists.' });
    // }

    // Check if the email already exists
    // const allUsers = await User.list();
    // if (allUsers.some((user) => user.email === email)) {
    //   return res.status(409).send({ message: 'Email already exists.' });
    // }

    // Create the user using the User model
    const user = await User.create({
      name,
      dob,
      bio,
      profile_img,
      email,
      username,
      password,
    });

    // Add the user ID to the session
    req.session.userId = user.id;

    // Respond with the created user (excluding sensitive data like the password hash)
    res.status(201).send({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_img: user.profile_img,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(500)
      .send({ message: 'An error occurred while registering the user.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Ensure the request body exists
    if (!req.body) {
      return res
        .status(400)
        .send({ message: 'Username and password are required.' });
    }

    // Extract username and password from the request body
    const { username, password } = req.body;
    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Validate the password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials.' });
    }

    // Add the user ID to the session
    req.session.userId = user.id;
    res.send(user);

    // Respond with the user data (excluding sensitive information like the password hash)
    // res.status(200).send({
    //   id: user.id,
    //   name: user.name,
    //   username: user.username,
    //   email: user.email,
    //   bio: user.bio,
    //   profile_img: user.profile_img,
    //   created_at: user.created_at,
    // });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

exports.showMe = async (req, res) => {
  try {
    // No cookie with an ID => Not authenticated
    if (!req.session.userId) {
      return res.status(401).send({ message: 'User must be authenticated.' });
    }

    // Cookie with an ID => Fetch user info
    const user = await User.find(req.session.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.send(user);

    // res.status(200).send({
    //   id: user.id,
    //   name: user.name,
    //   username: user.username,
    //   email: user.email,
    //   bio: user.bio,
    //   profile_img: user.profile_img,
    //   created_at: user.created_at,
    // });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res
      .status(500)
      .send({ message: 'An error occurred while fetching user info.' });
  }
};

exports.logoutUser = (req, res) => {
  req.session = null; // Destroy the session
  res.status(204).send({ message: 'Logged out successfully.' });
};
