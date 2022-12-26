import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/video';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss'],
  providers: [VideoService]
})
export default class VideoCenterComponent implements OnInit {

  constructor(private videoService: VideoService) {

  }
  videos!: Array<Video>;
  selectedVideo!: Video;
  hideNewVideo: boolean = true;

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this.videoService.addVideo(video).subscribe((resNewVideo: any) => {
      this.videos.push(resNewVideo);
      this.hideNewVideo = true;
      this.selectedVideo = resNewVideo;
    })
  }

  newVideo() {
    this.hideNewVideo = false;
  }

  onUpdateVideoEvent(video: any) {
    this.videoService.updateVideo(video).subscribe(resUpdateVideo => video = resUpdateVideo)
    this.selectedVideo = null as any;
  }

  onDeleteVideoEvent(video: any) {
    let VideoArr = this.videos;
    this.videoService.deleteVideo(video).subscribe((resDeleteVideo: any) => {
      for (let i = 0; i < VideoArr.length; i++) {
        if (VideoArr[i]._id === video._id) {
          VideoArr.splice(i, 1);
        }
      }
    });
    this.selectedVideo = null as any;
  }

}
