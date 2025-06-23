// models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import userModel from './userModel.js';
import { Product } from './productModel.js';
import orderModel from './orderModel.js';
import orderItemModel from './orderItem.js';
import payment from './Payment.js'; // updated import

const sequelize = new Sequelize('virtual_marketplace', 'root', '6305singh', {
  dialect: 'mysql',
  host: 'localhost',
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.User = userModel(sequelize, DataTypes);
db.Product = Product(sequelize, DataTypes);
db.Order = orderModel(sequelize, DataTypes);
db.OrderItem = orderItemModel(sequelize, DataTypes);
db.Payment = payment(sequelize, DataTypes);

// Setup associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
