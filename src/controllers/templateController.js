const templateService = require('../services/templateService');
const { successResponse, errorResponse } = require('../utils/response');


exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await templateService.getAllTemplates();
    successResponse(res, templates, 'Templates retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const { text, image, user_id } = req.body;
    console.log(req.body);
    const newTemplate = await templateService.createTemplate({ text, image, user_id });
    successResponse(res, newTemplate, 'Template created successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    const updatedTemplate = await templateService.updateTemplate(id, { text, image });
    successResponse(res, updatedTemplate, 'Template updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    await templateService.deleteTemplate(id);
    successResponse(res, null, 'Template deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};