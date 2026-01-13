import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Outil } from '../models/Outil';

@Injectable({ providedIn: 'root' })
export class OutilService {
  private baseUrl = '/api/OUTIL-SERVICE/outils';

  constructor(private http: HttpClient) {}

  GETALLOutils(): Observable<Outil[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response: any) => {
        // supports controller list OR spring-data-rest _embedded
        if (response?._embedded?.outils) return response._embedded.outils as Outil[];
        return (response ?? []) as Outil[];
      })
    );
  }

  ADDOutil(payload: Partial<Outil>): Observable<Outil> {
    return this.http.post<Outil>(this.baseUrl, payload);
  }

  UPDATEOutil(id: number | string, payload: Partial<Outil>): Observable<Outil> {
    // backend uses PATCH
    return this.http.patch<Outil>(`${this.baseUrl}/${id}`, payload);
  }

  DELETEOutil(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}