import {VideoDto} from "./video-dto";

export interface VideoPage {
  videos: Array<VideoDto>;

  totalPages: number;
}
