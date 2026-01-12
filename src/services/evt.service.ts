import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Evt } from '../models/Evt';

@Injectable({ providedIn: 'root' })
export class EvtService {
  private baseUrl = '/api/EVENEMENT-SERVICE/evenements';

  constructor(private httpClient: HttpClient) {}

  GETALLEvts(): Observable<Evt[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map((response: any) => {
        // supports controller list OR spring-data-rest _embedded
        if (response?._embedded?.evenements) return response._embedded.evenements as Evt[];
        return (response ?? []) as Evt[];
      })
    );
  }

  ADDEvt(payload: Partial<Evt>): Observable<Evt> {
    return this.httpClient.post<Evt>(this.baseUrl, payload);
  }

  UPDATEEvt(id: number, payload: Partial<Evt>): Observable<Evt> {
    return this.httpClient.put<Evt>(`${this.baseUrl}/${id}`, payload);
  }

  DELETEEvt(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}