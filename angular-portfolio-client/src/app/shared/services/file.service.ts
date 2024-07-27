import { Injectable, inject } from '@angular/core';
import { RequestService } from './request.service';
import { ApiResponse } from '@shared/models/api-response.model';
import { HttpParams } from '@angular/common/http';
import { FileResponseValue } from '@shared/models/file.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private requestService: RequestService = inject(RequestService);

  getFileByNames(names: string[]): Observable<ApiResponse<FileResponseValue[]>> {
    const paramsHeader = new HttpParams().set('names', JSON.stringify(names));
    return this.requestService.get<ApiResponse<FileResponseValue[]>>(`files-upload`, {
      httpRequestOptions:  { params: paramsHeader },
      mockFile: `assets/mock-data/file-response.mock.json`
    });
  }

  addFile(body: FormData): Observable<ApiResponse<FileResponseValue[]>> {
    return this.requestService.post<ApiResponse<FileResponseValue[]>>(`files-upload`, body , {
      mockFile: `assets/mock-data/file-response.mock.json`
    });
  }

  deleteFileByIds(ids: string[]): Observable<ApiResponse<FileResponseValue[]>> {
    const paramsHeader = new HttpParams().set('ids', JSON.stringify(ids));
    return this.requestService.delete<ApiResponse<FileResponseValue[]>>(`files-upload`, {
      httpRequestOptions:  { params: paramsHeader },
      mockFile: `assets/mock-data/response-success.mock.json`
    });
  }

  updateFileByIds(body: {ids: string[], isUse: boolean}): Observable<ApiResponse<FileResponseValue[]>> {
    return this.requestService.put<ApiResponse<FileResponseValue[]>>(`files-upload`, body, {
      mockFile: `assets/mock-data/response-success.mock.json`
    });
  }
}
