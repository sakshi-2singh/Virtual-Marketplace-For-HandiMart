// models/orderModel.js
const defineOrderModel = (sequelize, DataTypes) => {
  const OrderModel = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
     userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    paymentResult: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    shippingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

  }, {
    tableName: 'orders',
    timestamps: true,
  });

  OrderModel.associate = (models) => {
    OrderModel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    OrderModel.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems', // Ensure alias matches usage in queries
    });
  };

  return OrderModel;
};

export default defineOrderModel;
