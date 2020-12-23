import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  selected : boolean;
  currentUser : User;
  error:string;
  retrived:boolean;
  formData : FormGroup;
  result ;
  dept:string;
  confirmForm : FormGroup;
  selectedValue : number;

  constructor(private authenticationService : AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      specialist : new FormControl("",[Validators.required]),
    })
    this.confirmForm = new FormGroup({
      status : new FormControl("",[Validators.required]),
      scans : new FormControl(""),
    })
  }

  onClickSubmit(data){
    this.retrived = false;
    this.dept = data.specialist;
    this.error = '';
    let apikey = this.currentUser.apikey;
    this.authenticationService.consultAppointment(data,apikey).pipe(first())
    .subscribe(
        data => {
            if(data){
              this.retrived = true;
              this.result = data;
            }
        },
        error => {
            this.error = error.error.message;
        });;
  }

  onClickSave(data){
    data.aid = this.selectedValue
    let apikey = this.currentUser.apikey;
    this.authenticationService.updateAppointment(data,apikey).pipe(first())
    .subscribe(
        data => {
            if(data.affectedRows==1){
              this.selected = false;
              this.onClickSubmit(this.formData.value)
              Swal.fire('Success', 'Appointment status is updated!', 'success')
              this.confirmForm = new FormGroup({
                status : new FormControl("",[Validators.required]),
                scans : new FormControl(""),
              })
            }
        },
        error => {
            this.error = error.error.message;
        });;
  }

  onClickUpdate(data){
    this.selected = true
    this.selectedValue = data
  }
}
