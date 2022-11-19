export interface Item {
  itemId: number;
  name: string;
  defence?: number;
  magic?: number;
  attack?: number;
}

export interface UserType {
  uid: string;
  country: string;
  created_at: string;
  lv: number;
  items: Item[];
  block_type: boolean;
  pvp_rank: number;
  reward_type: string;
  last_stage: string;
}

export interface UserListType {
  list: UserType[];
}
