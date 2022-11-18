import { UserType } from '../type/userType';
import { atom } from 'recoil';

export const userListState = atom<UserType[]>({
  key: 'userlist',
  default: [],
});

export const loadingState = atom<boolean>({
  key: 'loading',
  default: false,
});
