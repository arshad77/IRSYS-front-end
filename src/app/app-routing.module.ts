import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auths/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Role } from './models/role';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  
{ 
  path: 'login', 
  component: LoginComponent, 
},
{ 
  path: 'status', 
  component: StatusComponent, 
},
{ 
  path: 'confirm', 
  component: ConsultantComponent, 
  canActivate: [AuthGuard], 
  data: { roles: [Role.Update,Role.Admin] } 
},
{ 
    path: 'book', 
    component: BookingComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [Role.Insert,,Role.Admin] } 
},
{ 
  path: 'home', 
  component: HomeComponent, 
},{
  path: '',
  component: HomeComponent
},


// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
