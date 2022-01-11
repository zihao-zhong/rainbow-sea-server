import { Column, Model, Table, DataType } from 'sequelize-typescript';
import * as moment from 'moment';

@Table({
  tableName: 't_user', // 表名称
  comment: '用户表', // 表的描述信息
  engine: 'InnoDB', // 数据库引擎
  charset: 'utf8', // 设置字符集
  collate: 'utf8_bin', // 设置模型的表指定排序规则
  // paranoid: true, // 软删除
  // timestamps: true, // 要配置软删除需要时间戳设置为 true
  createdAt: false, // 禁用该字段，自行定义
  updatedAt: false, // 禁用该字段，自行定义
  freezeTableName: true, // 保持表名，不需要加复数形式
  indexes: [  // 设置索引
    {
      type: 'UNIQUE',
      fields: ['email'],
    }
  ],
  scopes: { // 提前设置好常用的范围过滤
    findByEmail(email) {
      return {
        where: {
          email,
        }
      }
    }
  },
})
export class User extends Model {

  // // 数据创建前的钩子 Hooks
  // @BeforeCreate
  // beforeCreate(instance: User) {
  //   // instance 用户新增的数据
  //   instance.role = 'general';
  // }

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
    comment: '邮箱地址',
    field: 'email',
    unique: true, // 做唯一性校验
    validate: {
      isEmail: true
    }
  })
  public email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '密码',
    field: 'password',
  })
  public password: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '用户名',
    field: 'username',
  })
  public username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '用户头像',
    field: 'avatar',
  })
  public avatar: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: 'general',
    comment: '角色, general: 普通用户, admin: 管理员',
    field: 'role',
    validate: {
      isIn: {
        args: [['general', 'admin']],
        msg: '用户角色设置错误',
      }
    }
  })
  public role: string;

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
    // set(val) {
    //   this.setDataValue('createdAt', val);
    // },
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

  // @Column({
  //   type: DataType.DATE,
  //   allowNull: true,
  //   defaultValue: null,
  //   comment: '删除时间',
  //   field: 'deleted_at',
  //   get() {
  //     return moment(this.getDataValue('deletedAt')).format('YYYY-MM-DD HH:mm:ss');
  //   },
  // })
  // public deletedAt: Date;
}
