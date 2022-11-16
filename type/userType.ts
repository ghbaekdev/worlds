export interface ItemsType {
  items: {
    itemId: number;
    name: string;
    defence?: number | undefined;
    magic?: number | undefined;
    attack?: number | undefined;
  };
}

export interface UserType {
  uid: string;
  country: string;
  created_at: string;
  lv: number;
  items: ItemsType[];
  block_type: boolean;
  pvp_rank: number;
  reward_type: string;
  last_stage: string;
}

export interface UserListType {
  list: UserType[];
}
