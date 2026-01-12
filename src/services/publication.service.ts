import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/models/Publication';
//le service accepte detre injecte sur toute la root du projet mais en peut faire des limites
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  getPublicationById(id: string):Observable<Publication> {
    return this.httpClient.get<Publication>(`http://localhost:3000/publications/${id}`);
  }
  constructor(private httpClient:HttpClient){}

  GETALLPublications():Observable<Publication[]>{
    //generation de la requete http en mode GET
    return this.httpClient.get<Publication[]>('http://localhost:3000/publications')
  }

  ADDPublication(m:Publication):Observable<void>{
    return this.httpClient.post<void>('http://localhost:3000/publications',m)
  }
  UPDATEPublication(m:Publication,id:string):Observable<void>{
    return this.httpClient.put<void>(`http://localhost:3000/publications/${id}`, m);  
  }
  DELETEPublication(id:String):Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:3000/publications/${id}`)
  }
  
}
