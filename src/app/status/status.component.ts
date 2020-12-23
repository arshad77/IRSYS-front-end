import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  currentUser : User;
  error:string;
  retrived:boolean;
  formData : FormGroup;
  result ;

  constructor(private authenticationService : AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email : new FormControl("",[Validators.required,Validators.email]),
      date : new FormControl("",[Validators.required])
    })
  }

  onClickSubmit(data){
    this.retrived = false;
    this.error = '';
    let apikey ='adkey';
    if(this.currentUser){
     apikey = this.currentUser.apikey;
    }
    this.authenticationService.searchAppointment(data,apikey).pipe(first())
    .subscribe(
        data => {
            if(data){
              this.retrived = true;
              this.result = data[0]
            }
        },
        error => {
            this.error = error.error.message;
        });;
  }

}
