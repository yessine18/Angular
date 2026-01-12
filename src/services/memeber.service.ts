import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private baseUrl = '/api/MEMBRE-SERVICE/membres';

  constructor(private httpClient: HttpClient) {}

  GETALLMembers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
    // or if you want full objects:
    // return this.httpClient.get<any[]>(`${this.baseUrl}/full`);
  }

  ADDEnseignant(payload: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/enseignant`, payload);
  }

  ADDEtudiant(payload: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/etudiant`, payload);
  }

  UPDATEEnseignant(id: any, payload: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/enseignant/${id}`, payload);
  }

  UPDATEEtudiant(id: any, payload: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/etudiant/${id}`, payload);
  }

  DELETEMember(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}