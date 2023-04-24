export interface VideoDto {

  id: number,
  title: string;
  description: string;
  tags: Array<string>;
  streamUrl: string;
  previewUrl: string;

  viewCount: number;

  likes: number;

  dislikes: number;

  authorName: string;

  authorId: number;

  isSubscribedToAuthor: boolean;

  videoResolution: number;

}
