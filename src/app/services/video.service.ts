import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Video } from '../video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getUrl = '/api/videos';
  postUrl = '/api/video';
  putUrl = '/api/video/';
  deleteUrl = '/api/video/';

  getVideos() {

    return this.http.get<any>(this.getUrl).pipe(map((data: any) => {
      return data;
    }))
  }

  addVideo(video: Video) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    return this.http.post<any>(this.postUrl, JSON.stringify(video), options).pipe(map((response: Response) => { return response; }));

  }

  updateVideo(video: Video) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers }
    return this.http.put<any>(this.putUrl + video._id, JSON.stringify(video), options).pipe(map((response: Response) => { return response; }));
  }

  deleteVideo(video: Video) {
    return this.http.delete<any>(this.deleteUrl + video._id).pipe(map((response: Response) => { return response; }));
  }

}
