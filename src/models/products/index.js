const {DB_STORE, DataTypes, Model} = require('../../config/database')

class Products extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: DataTypes.STRING(255),
        price: DataTypes.STRING(255),
        evaluate: DataTypes.STRING(255),
        createdat: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updatedat: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Products',
        tableName: 'products',
        timestamps: false, // Turn off automatic timestamps if not needed
      }
    );
  }

  toJSON() {
    const { id, name, price, evaluate, createdat, updatedat } = this;
    const data = { id, name, price, evaluate, createdat, updatedat };
    return data;
  }
}

Products.init(DB_STORE);

module.exports = Products