export interface IImage {
  url: string;
}

export interface IUser {
  id: number;
  name: string;
  profile: null | string;
}

export interface ILike {
  id: number;
  post_id: number;
  comment_id: number | null;
  user_id: number;
}

export interface IComment {
  id: number;
  content: string;
  user: IUser;
  likes: ILike[];
}

export interface IPostWithComments {
  id: number;
  contents: string;
  views: number;
  user_id: number;
  createdAt: any;
  updatedAt: any;
  images: IImage[];
  user: IUser;
  comments: IComment[];
  likes: ILike[];
}
