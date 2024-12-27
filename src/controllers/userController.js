const crypto = require('crypto');
const adminService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/response');

exports.getAllUsers = async (req, res) => {
  try {
    const admins = await adminService.getAllUsers();
    successResponse(res, admins, 'Users retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const newUser = await adminService.createUser({ name, username, password: hashedPassword, role });
    successResponse(res, newUser, 'User created successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, password, role } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const updatedUser = await adminService.updateUser(id, { name, username, password: hashedPassword, role });
    successResponse(res, updatedUser, 'User updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};