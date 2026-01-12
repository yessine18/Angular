import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';
//le service accepte detre injecte sur toute la root du projet mais en peut faire des limites
@Injectable({
  providedIn: 'root'
})
export class MemeberService {
  getMemberById(id: string):Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:3000/members/${id}`);
  }
  constructor(private httpClient:HttpClient){}

  GETALLMembers():Observable<Member[]>{
    //generation de la requete http en mode GET
    return this.httpClient.get<Member[]>('http://localhost:3000/members')
  }

  ADDMember(m:Member):Observable<void>{
    return this.httpClient.post<void>('http://localhost:3000/members',m)
  }
  UPDATEMember(m:Member,id:string):Observable<void>{
    return this.httpClient.put<void>(`http://localhost:3000/members/${id}`, m);  
  }
  DELETEMember(id:String):Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:3000/members/${id}`)
  }
  
}
