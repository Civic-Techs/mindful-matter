const User = require('../db/models/User');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).send({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_img: user.profile_img,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error('Error fetching user by ID: ', error);
    res.status(500).send({ message: 'An error occurred while fetching user.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, profile_img } = req.body;

    const updateUser = await User.editUser({
      id,
      name,
      bio,
      profile_img,
      email,
      username,
      password_hash,
    });

    if (!updateUser) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res
      .status(200)
      .send({ message: 'User updated successfully.', user: updateUser });
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).send({ message: 'An error occurred while updating user.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteUser(id);
    if (!deleted) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.status(500).send({ message: 'An error occurred while deleting user.' });
  }
};
