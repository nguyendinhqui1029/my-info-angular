
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VideoModel } from 'src/model/video.model';
import { LocatorService } from './locator.service';


@Injectable()
export class UploadVideoService {
  constructor(private httpClient: HttpClient, private ls: LocatorService, private authService: SocialAuthService) {
  }
  uploadVideo(video: any, input: VideoModel): Observable<any> {
    return new Observable((subscribe) => {
      if (!localStorage.getItem('accessTokenUpload')) {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, {
          scope: ["https://www.googleapis.com/auth/youtubepartner", "https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.force-ssl"].join(' ')
        }).then(
          (reponse) => {
            localStorage["accessTokenUpload"] = reponse.authToken;
            subscribe.next(this.upload(video, input));
            subscribe.complete();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        subscribe.next(this.upload(video, input));
        subscribe.complete();
      }

    });
  }

  upload(video: any, input: VideoModel) {
    const data = {
      snippet: {
        title: input.title,
        description: input.description,
        tags: input.tags,
        categoryId: input.categoryId
      },
      status: {
        privacyStatus: input.privacyStatus,
        embeddable: true
      }
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage["accessTokenUpload"]}`)
      .set('Content-Type', 'application/json; charset=UTF-8')
      .set('X-Upload-Content-Length', video.size + '')
      .set('X-Upload-Content-Type', 'video/*');

    const url = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails';
    return this.httpClient.post(url, data, { headers, observe: 'response', responseType: 'text' })
      .pipe(switchMap(newData => {
        const newRequest = new HttpRequest('PUT', newData.headers.get('location'), video, { reportProgress: true });
        return this.httpClient.request(newRequest);
      }));
  }
  getAllCategoryByChannel(channelId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${environment.client_key.google.key_api}`;
    return this.httpClient.get(url);
  }

  getAllVideoByChannel(channelId: string, maxResults: number = 20): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${environment.client_key.google.key_api}&channelId={${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    return this.httpClient.get(url);
  }
}


