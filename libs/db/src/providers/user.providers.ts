import { User } from '../models/user.entity';
import { USER_REPOSITORY } from '../utils/constant';

export const UserProviders = {
  provide: USER_REPOSITORY,
  useValue: User,
};
