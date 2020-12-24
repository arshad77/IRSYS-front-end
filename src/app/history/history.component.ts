import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  formData : FormGroup;
  currentUser : User;
  retrived:boolean;
  userName:string;
  error:string;
  result;

  constructor(private authenticationService : AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    this.formData = new FormGroup({
      fname : new FormControl("",[Validators.required]),
      lname  : new FormControl("",[Validators.required]),
      email  : new FormControl("",[Validators.required])

    })
  }

  onClickSubmit(data){
    this.retrived = false;
    this.userName = data.fname;
    this.error = '';
    let apikey = this.currentUser.apikey;
    this.authenticationService.retriveHistory(data,apikey).pipe(first())
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
    console.log(data)
}

}
