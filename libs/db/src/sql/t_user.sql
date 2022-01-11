create table t_user (
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  email varchar(255) NOT NULL COMMENT '邮箱地址',
  password varchar(255) NOT NULL COMMENT '密码',
  username varchar(255) NULL COMMENT '用户名',
  avatar varchar(255) NULL COMMENT '头像',
  role varchar(255) DEFAULT 'general' COMMENT '角色',
  created_by varchar(255) DEFAULT NULL COMMENT '创建人',
  updated_by varchar(255) DEFAULT NULL COMMENT '最后更新人',
  created_at datetime NULL COMMENT '创建时间',
  updated_at datetime NULL COMMENT '修改时间',
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 comment '用户表';