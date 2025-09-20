import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 private firebaseUrl = 'https://qeena-d1bd2-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) { }

  // POST contact to Firebase
  addContact(contact: any): Observable<any> {
    return this.http.post(this.firebaseUrl, contact);
  }

  // GET all contacts from Firebase
  getContacts(): Observable<any> {
    return this.http.get(this.firebaseUrl);
  }
}
