const db = require('../utils/db');

exports.getAllTemplates = async () => {
  const [rows] = await db.query('SELECT * FROM templates');
  return rows;
};

exports.createTemplate = async (templateData) => {
  const { text, image, user_id } = templateData;

  // Check if the template name already exists
  const [existingTemplate] = await db.query('SELECT * FROM templates WHERE text = ?', [text]);
  if (existingTemplate.length > 0) {
    throw new Error('Template name already exists');
  }

  const [result] = await db.query('INSERT INTO templates (text, image, user_id ,created_at) VALUES (?, ?, ?, ?)', [text, image, user_id, new Date()]);
  return { id: result.insertId, text, image, user_id };
};

exports.updateTemplate = async (id, templateData) => {
  const { text, image } = templateData;
  console.log(`Updating template with ID: ${id}`);
  const [result] = await db.query('UPDATE templates SET text = ?, image = ?, updated_at = ? WHERE id = ?', [text, image, new Date(), id]);
  if (result.affectedRows === 0) {
    throw new Error('Template not found');
  }
  return { id, text, image };
};

exports.deleteTemplate = async (id) => {
  console.log(`Deleting template with ID: ${id}`);
  const [result] = await db.query('DELETE FROM templates WHERE id = ?', [id]);
  if (result.affectedRows === 0) {
    throw new Error('Template not found');
  }
};