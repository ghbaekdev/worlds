export interface Data {
  data: {
    success: boolean;
    error: null;
    result: {
      uid: string;
      country: string;
      created_at: string;
      lv: number;
      items: {
        itemId: number;
        name: string;
        defence?: number;
        magic?: number;
        attack?: number;
      }[];
      block_type: boolean;
      pvp_rank: number;
      reward_type: string;
      last_stage: string;
    }[];
  };
}
