import { Column, Model, Table, DataType } from 'sequelize-typescript';
import * as moment from 'moment';

@Table({
  tableName: 'r_user',
  comment: '用户表',
  timestamps: false,
  freezeTableName: true, // 保持表名，不需要加复数形式
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增ID',
    field: 'id',
  })
  public id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '用户名',
    field: 'username',
  })
  public username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: '手机号码',
    field: 'phone',
  })
  public phone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: '邮箱地址',
    field: 'email',
  })
  public email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: 'qq号码',
    field: 'qq',
  })
  public qq: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: '创建人',
    field: 'created_by',
  })
  public createdBy: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: '修改人',
    field: 'updated_by',
  })
  public updatedBy: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '创建时间',
    field: 'created_at',
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    },
  })
  public createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '修改时间',
    field: 'updated_at',
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    },
  })
  public updatedAt: Date;
}
