// types.ts
export interface Post {
    id: number;
    outfitId?: number;
    commId?: number;
    userId: string;
    imgUrl: string;
    nickname: string;
    createdAt: string;
    contents: string;
    title: string;
    heartCnt: number;
    commentCnt: number;
    postDate: string;
  }
  