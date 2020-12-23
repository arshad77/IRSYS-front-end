import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first} from 'rxjs/operators';
import {Application} from '../models/application';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  currentUser: User;
  doctors : Doctor[];
  added : boolean;
  error;
  constructor(
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
  appication : Application;
  formData : FormGroup;
  spl : string;
  ngOnInit(): void {
    this.added = false;
    this.doctors =  [{
      name : '',
      did:2,
      speciality:''
    }];
    this.formData = new FormGroup({
      fname : new FormControl("",[Validators.required]),
      lname : new FormControl("",[Validators.required]),
      phone : new FormControl("",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email : new FormControl("",[Validators.required,Validators.email]),
      date : new FormControl("",[Validators.required]),
      time : new FormControl("",[Validators.required]),
      insurance : new FormControl("",[Validators.required]),
      specialist : new FormControl("",[Validators.required]),
      doctor : new FormControl("",[Validators.required]),
      description : new FormControl("",Validators.required)
    })
  }

  onClickSubmit(data){
    data.status = 'PENDING';
    let newApplication:Application = data; 
    let apikey = this.currentUser.apikey;
    this.authenticationService.saveAppointment(newApplication,apikey).pipe(first())
    .subscribe(
        data => {
            if(data.insertId){
              this.added = true;
              Swal.fire('Success', 'You request for appointment is added!', 'success')
              this.formData = new FormGroup({
              fname : new FormControl("",[Validators.required]),
              lname : new FormControl("",[Validators.required]),
              phone : new FormControl("",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
              email : new FormControl("",[Validators.required,Validators.email]),
              date : new FormControl("",[Validators.required]),
              time : new FormControl("",[Validators.required]),
              insurance : new FormControl("",[Validators.required]),
              specialist : new FormControl("",[Validators.required]),
              doctor : new FormControl("",[Validators.required]),
              description : new FormControl("",Validators.required)
            })
            }
        },
        error => {
            this.error = error.error.message;
        });;
    
  }

  onSplChange(speciality){
    let apikey = this.currentUser.apikey;
        this.authenticationService.getDoctors(speciality,apikey).pipe(first())
        .subscribe(
            data => {
               this.doctors = data;
            },
            error => {
                console.log(error)
            });
    
  }

}
