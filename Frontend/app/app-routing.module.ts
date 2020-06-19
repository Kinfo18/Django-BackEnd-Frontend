import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { CarreraComponent } from './components/carreras/carrera/carrera.component';
import { DocenteComponent } from './components/docentes/docente/docente.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'home', component: CarrerasComponent,
    children: [{ path: ':somePath', component: CarrerasComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: 'home/docentes/:carreraId', component: DocentesComponent,
    children: [{ path: ':somePath', component: DocentesComponent }],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
