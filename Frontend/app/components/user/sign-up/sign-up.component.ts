import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService} from './../../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = 'Algo salió mal. Póngase en contacto con el administrador.';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
