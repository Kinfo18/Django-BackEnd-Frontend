import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarreraService } from './../../shared/services/carrera.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  carreraCodigo: string;
  carreraNombre: string;

  constructor(private route: ActivatedRoute,
              private carreraService: CarreraService) { }

  ngOnInit() {
    this.carreraCodigo = this.route.snapshot.paramMap.get('carreraCodigo');
    this.getCarreraNombre(this.carreraCodigo);
  }

  getCarreraName(Codigo: string) {
    this.companyService.getCompany(id).subscribe((res) => {
     // tslint:disable-next-line:no-string-literal
     // this.carreraNombre = res['nombre'];
    },
    err => {
      console.log(err);
    });
  }
}
