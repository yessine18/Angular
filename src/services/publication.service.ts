import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publication } from 'src/models/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  
  private baseUrl = '/api/PUBLICATION-SERVICE/publications';

  constructor(private httpClient: HttpClient) {}

  GETALLPublications(): Observable<Publication[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map((response: any) => {
        if (response._embedded && response._embedded.publications) {
          return response._embedded.publications;
        }
        return response;
      })
    );
  }

  getPublicationById(id: string): Observable<Publication> {
    return this.httpClient.get<Publication>(`${this.baseUrl}/${id}`);
  }

  ADDPublication(m: Publication): Observable<Publication> {
    return this.httpClient.post<Publication>(this.baseUrl, m);
  }

  UPDATEPublication(m: Publication, id: string): Observable<Publication> {
    return this.httpClient.put<Publication>(`${this.baseUrl}/${id}`, m);
  }

  DELETEPublication(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}