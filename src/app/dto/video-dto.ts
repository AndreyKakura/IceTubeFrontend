export interface VideoDto {

  id: number,
  title: string;
  description: string;
  tags: Array<string>;
  videoStatus: string;
  streamUrl: string;
  previewUrl: string;

}
