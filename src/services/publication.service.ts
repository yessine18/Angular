import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/Publication';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private baseUrl = '/api/PUBLICATION-SERVICE/publications';

  constructor(private http: HttpClient) {}

  // Keep your existing method names so you don't have to refactor other files
  GETALLPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl);
  }

  ADDPublication(payload: Partial<Publication>): Observable<Publication> {
    return this.http.post<Publication>(this.baseUrl, payload);
  }

  UPDATEPublication(id: number, payload: Partial<Publication>): Observable<Publication> {
    return this.http.put<Publication>(`${this.baseUrl}/${id}`, payload);
  }

  DELETEPublication(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}