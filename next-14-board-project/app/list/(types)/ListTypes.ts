export interface ListTypes {
  seq: number;
  nick_name: string;
  title: string;
  content: string;
  like_count: number;
  view_count: number;
  reply_count: number;
  created_at: string;
}

export interface ReplyTypes {
  seq: number;
  board_seq: number;
  nick_name: string;
  content: string;
  created_at: string;
}
