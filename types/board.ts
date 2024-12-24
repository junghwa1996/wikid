export interface Writer {
  name: string;
  id: number;
  image?: string | null;
}

export interface BaseEntity {
  id: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface BoardBase extends BaseEntity {
  title?: string;
  image?: string;
  content?: string;
  likeCount?: number;
}

export interface BoardCreateData {
  title: string;
  content: string;
  image: string;
}

export interface Board extends BoardBase {
  writer: Writer;
}

export interface BoardResponse {
  list: Board[];
  totalCount: number;
}

export interface BoardListResponse {
  data: Board[];
}

export interface Comment extends BaseEntity {
  content: string;
  writer: Writer;
}

export interface CommentsData {
  list: Comment[];
  nextCursor: string | null;
}

export interface ArticleData extends BoardBase {
  writer: Writer;
  isLiked: boolean;
}
