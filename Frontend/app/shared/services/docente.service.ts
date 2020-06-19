import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Docente } from './../models/docente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  selectedDocente: Docente = new Docente();
  docentes: Docente[];

  constructor(private http: HttpClient) { }

  saveDocente(docente: Docente) {
    return this.http.post(environment.apiBaseUrl + '/docente/', docente);
  }

  getDocenteList(documento: string) {
    return this.http.get(environment.apiBaseUrl + '/docente/carrera' + `/${documento}/`);
  }

  updateDocete(documento: string, docente: Docente) {
    return this.http.put(environment.apiBaseUrl + '/docente' + `/${documento}/`, docente);
  }

  deleteDocumento(documento: string) {
    return this.http.delete(environment.apiBaseUrl + '/docente' + `/${documento}/`);
  }

}
