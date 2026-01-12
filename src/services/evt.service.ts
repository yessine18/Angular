import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evt } from 'src/models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EvtService {
  
  private baseUrl = '/api/EVENEMENT-SERVICE/evenements';

  constructor(private httpClient: HttpClient) {}

  GETALLEvts(): Observable<Evt[]> {
    return this.httpClient.get<any>(this.baseUrl).pipe(
      map((response: any) => {
        if (response._embedded && response._embedded.evenements) {
          return response._embedded.evenements;
        }
        return response;
      })
    );
  }

  getEvtById(id: string): Observable<Evt> {
    return this.httpClient.get<Evt>(`${this.baseUrl}/${id}`);
  }

  ADDEvt(e: Evt): Observable<Evt> {
    return this.httpClient.post<Evt>(this.baseUrl, e);
  }

  UPDATEEvt(id: string, evt: Evt): Observable<Evt> {
    return this.httpClient.put<Evt>(`${this.baseUrl}/${id}`, evt);
  }

  DELETEEvt(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}