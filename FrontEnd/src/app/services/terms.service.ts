import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Convention, Terms} from "../core/model/db";


@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private apiUrl = 'http://localhost:8222/api/conventions/terms'; // Vérifiez l'URL correcte pour vos API
  private conventionsUrl = 'http://localhost:8222/api/conventions/'; // URL pour les conventions

  constructor(private http: HttpClient) {}

  getAllTerms(): Observable<Terms[]> {
    return this.http.get<Terms[]>(`${this.apiUrl}/all`);
  }

  addTerms(terms: Terms): Observable<Terms> {
    return this.http.post<Terms>(`${this.apiUrl}/add`, terms);
  }
  deleteTerm(termId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${termId}`);
  }

// Récupérer un terme par son ID
  getTermById(id: number): Observable<Terms> {
    return this.http.get<Terms>(`${this.apiUrl}/get/${id}`);
  }
  // Méthode pour récupérer toutes les conventions
  getAllConventions(): Observable<Convention[]> {
    return this.http.get<Convention[]>(this.conventionsUrl);
  }
  updateTerm(term: Terms): Observable<Terms> {
    return this.http.put<Terms>(`${this.apiUrl}/update/${term.termId}`, term);
  }
}
