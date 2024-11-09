import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternshipInter } from '../services/InternshipInter';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private baseUrl = 'http://localhost:8222/api/internships';

  constructor(private http: HttpClient) { }

  getAllInternships(): Observable<InternshipInter[]> {
    return this.http.get<InternshipInter[]>(this.baseUrl);
  }

  getInternshipById(id: number): Observable<InternshipInter> {
    return this.http.get<InternshipInter>(`${this.baseUrl}/${id}`);
  }

  createInternship(internship: InternshipInter): Observable<InternshipInter> {
    return this.http.post<InternshipInter>(this.baseUrl, internship);
  }

  updateInternship(id: number, internship: InternshipInter): Observable<InternshipInter> {
    return this.http.put<InternshipInter>(`${this.baseUrl}/${id}`, internship);
  }

  deleteInternship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
