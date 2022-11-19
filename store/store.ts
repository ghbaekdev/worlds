import { UserType } from '../type/userType';
import { atom } from 'recoil';

export const userListState = atom<UserType[]>({
  key: 'userlist',
  default: [],
});
