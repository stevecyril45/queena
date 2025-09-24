import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // ✅ FIXED import
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private firebaseUrl = 'https://qeena-d1bd2-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  addContact(contact: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}.json`, contact);
  }

  getContacts(): Observable<any[]> {
    return this.http.get<{ [key: string]: any }>(`${this.firebaseUrl}.json`).pipe(
      map((response: { [key: string]: any } | null) => {
        if (!response) return [];
        return Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        }));
      })
    );
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.firebaseUrl}/${id}.json`);
  }
}
