import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Company } from './../../../shared/models/carrera.model';
import { environment } from '../../../../environments/environment';
import { CompanyService } from './../../../shared/services/carrera.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CompanyComponent implements OnInit {

  carreraList: Company[];
  comMessage: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  imageUrl = 'assets/img/logo.png';
  logoUrl$: Observable<string | null>;

  constructor(private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private carreraService: CarreraService, ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshCarreraList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.carreraService.selectedCarrera = {
      codigo: '',
      nombre: '',
      departamento: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id === '') {
      this.carreraService.saveCarrera(form.value).subscribe((res) => {
        this.resetForm();
        this.refreshCarreraList();
        this.toastr.success('Successfully Saved!');
      },
        err => {
          this.toastr.error(err.error);
          console.log(err);
        });
    } else {
      this.carreraService.updateCarrera(form.value.id, form.value).subscribe((res) => {
        this.resetForm();
        this.refreshCarreraList();
        this.toastr.success('Successfully Updated!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  onEdit(carrera: Carrera) {
    this.carreraService.selectedCarrera = Object.assign({}, carrera);
    this.getCarreraLogoUrl(carrera.id);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.carreraService.deleteCarrera(id).subscribe((res) => {
        this.resetForm();
        this.refreshCarreraList();
        this.toastr.success('Successfully Deleted!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  refreshCarreraList() {
    this.carreraService.getCarreraList().subscribe((res) => {
      if (res) {
        this.carreraList = [];
        for (let i in res) {
          const data: Carrera = {
            codigo: res[i]['codigo'],
            nombre: res[i]['nombre'],
            dependencia: res[i]['dependencia']
          };
          this.carreraList.push(data);
        }
        this.carreraService.carreras = this.carreraList;
      }
      if (this.carreraService.carreras.length === 0) {
        this.comMessage = 'No se han añadido carreras';
      } else {
        this.comMessage = '';
      }
    },
      err => {
        this.toastr.error('Error!');
        console.log(err);
      });
  }

  addDocente(carreraId) {
    this.router.navigate(['home/docente', carreraId]);
  }

  getCarreraLogoUrl(id: string) {
    this.carreraService.getCarrera(id).subscribe((res) => {
      // tslint:disable-next-line:no-string-literal
      this.logoUrl$ = res['url'];
    },
      err => {
        console.log(err);
      });
  }
}
