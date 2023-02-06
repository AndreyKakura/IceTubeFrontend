export interface NewVideoDto {
  title: string;
  description: string;
  tags: Array<string>;
  videoStatus: string;
  videoFile: File;
  previewFile: File;

}
