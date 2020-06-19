import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { docente } from './../../../shared/models/docente.model';
import { DocenteService } from './../../../shared/services/docente.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class docenteComponent implements OnInit {

  employeeList: docente[];
  companyId: string;
  empMessage: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = '[0-9]{10}';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private employeeService: DocenteService, ) { }

  ngOnInit() {
    this.carreraId = this.route.snapshot.paramMap.get('carreraId');
    this.DocenteService.selectedDocente.carreraId = this.carreraId;
    this.resetForm();
    this.refreshDocenteList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.DocenteService.selectedDocente = {
      codigo: '',
      nombre: '',
      apellido: '',
      departamento: '',
      carreraId: this.carreraId
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id === '') {
      this.docenteService.saveDocente(form.value).subscribe((res) => {
        this.resetForm();
        this.refreshDocenteList();
        this.toastr.success('Successfully Saved!');
      },
        err => {
          this.toastr.error(err.error);
          console.log(err);
        });
    } else {
      this.docenteService.updateDocente(form.value.id, form.value).subscribe((res) => {
        this.resetForm();
        this.refreshDocenteList();
        this.toastr.success('Successfully Updated!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  onEdit(emp: Docente) {
    this.docenteService.selectedDocente = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('¿Está seguro de eliminar este registro?') === true) {
      this.docenteService.deleteDocente(id).subscribe((res) => {
        this.resetForm();
        this.refreshDocenteList();
        this.toastr.success('¡Eliminado con éxito!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  refreshDocenteList() {
    this.docenteService.getDocenteList(this.carreraId).subscribe((res) => {
      if (res) {
        this.docenteList = [];
        for (let i in res) {
          const data: Docente = {
            codigo: res[i]['codigo'],
            nombre: res[i]['nombre'],
            apellido: res[i]['apellido'],
            email: res[i]['email'],
            carreraId: res[i]['carreraId']
          };
          this.docenteList.push(data);
        }
        this.docenteService.docentes = this.docenteList;
      }
      if (this.docenteService.docente.length === 0) {
        this.empMessage = 'No se han añadido empleados';
      } else {
        this.empMessage = '';
      }
    },
      err => {
        this.toastr.error('Error!');
        console.log(err);
      });
  }

}
