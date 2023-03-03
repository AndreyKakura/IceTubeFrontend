import {VideoDto} from "./video-dto";

export interface VideoPageDto {
  videos: Array<VideoDto>;

  totalPages: number;
}
