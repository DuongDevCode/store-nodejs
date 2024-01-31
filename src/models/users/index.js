const {DB_STORE, DataTypes, Model} = require('../../config/database')

class Users extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
        email: DataTypes.STRING(255),
        phonenumber: DataTypes.STRING(255),
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
        modelName: 'Users',
        tableName: 'users',
        timestamps: false, // Turn off automatic timestamps if not needed
      }
    );
  }

  toJSON() {
    const { id, username, password, email, phonenumber, createdat, updatedat } = this;
    const data = { id, username, password, email, phonenumber, createdat, updatedat };
    return data;
  }
}

Users.init(DB_STORE);

module.exports = Users