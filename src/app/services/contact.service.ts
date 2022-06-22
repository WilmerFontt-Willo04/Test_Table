import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { itemContact } from '../models/contactoModel';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts!: itemContact[];
  URL_API = 'http://localhost:4000/api/contacts';

  selecttedContact: itemContact = {
    nombreCompleto: '',
    nombreEmpresa: '',
    email: '',
    telefono: '',
    categoria: '',
    mensaje: '',
  };

  constructor(private http: HttpClient) {}

  createContact(contact: itemContact) {
    return this.http.post(this.URL_API, contact);
  }

  getContacts() {
    return this.http.get<itemContact[]>(this.URL_API);
  }

  deleteContact(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
