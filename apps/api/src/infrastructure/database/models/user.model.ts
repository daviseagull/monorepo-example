import { User } from '@/domain/entities/user.entity'
import { DataTypes, Model } from 'sequelize'
import db from '../sequelize.config'

export class UserModel extends Model<User> {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, tableName: 'users', paranoid: true }
)
