import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EvtService {

  constructor(private httpClient:HttpClient) { }

  GETALLEvts():Observable<Evt[]>{
    return this.httpClient.get<Evt[]>('http://localhost:3000/evts');
  }
  ADDEvt(e:Evt):Observable<void>{
    return this.httpClient.post<void>('http://localhost:3000/evts',e)
  }
  DELETEEvt(id: string):Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:3000/evts/${id}`)
  }

  UPDATEEvt(id: string, evt: Evt): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:3000/evts/${id}`, evt);
  }
}
