import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from 'src/app/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  inputs: ['videos']
})
export class VideoListComponent {
  @Input() videos: any;
  @Output() selectVideo: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  onSelect(vid:Video) {
    this.selectVideo.emit(vid);
  }

}
