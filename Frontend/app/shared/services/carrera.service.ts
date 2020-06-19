import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Carrera } from './../models/carrera.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  selectedCarrera: Carrera = new Carrera();
  carreras: Carrera[];

  constructor(private http: HttpClient) { }

  saveCarrera(carrera: Carrera) {
    return this.http.post(environment.apiBaseUrl + '/carrera/', carrera);
  }

  getCarreraList() {
    return this.http.get(environment.apiBaseUrl + '/carrera/');
  }

  updateCarrera(codigo: string, carrera: Carrera) {
    return this.http.put(environment.apiBaseUrl + '/carrera' + `/${codigo}/`, carrera);
  }

  deleteCarrera(codigo: string) {
    return this.http.delete(environment.apiBaseUrl + '/carrera' + `/${codigo}/`);
  }

  getCarrera(codigo: string) {
    return this.http.get(environment.apiBaseUrl + '/carreralogodownload' + `/${codigo}/`);
  }

}
