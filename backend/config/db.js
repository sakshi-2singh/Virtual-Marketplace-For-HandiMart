// backend/config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('virtual_marketplace', 'root', '6305singh', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging
});

export default sequelize; // <-- DEFAULT EXPORT
