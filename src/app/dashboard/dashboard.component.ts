import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectfromdate  : Date;
  selecttodate : Date;
  selectfromtime : Date;
  selecttotime : Date;
  listevent : any;


  // month;

  constructor(private auth: AuthService) {
    this.selectfromdate =  new Date(new Date(new Date().setDate(new Date().getDate()-30 )).setHours(9, 0, 0));
    this.selecttodate = new Date(new Date(new Date().setDate(new Date().getDate() )).setHours(8, 59, 59));
    this.selectfromtime = new Date(new Date().setHours(9, 0, 0));
    this.selecttotime = new Date(new Date().setHours(8, 59, 0));

  }

  ngOnInit(): void {
    this.forevent();


  }

  onFromDateSelect(): void {
    // Set the minimum date for the to datepicker
    // this.selecttodate = null as any; 
    // this.minDate = new Date(this.selectfromdate);
    // this.minDate.setDate(this.minDate.getDate() + 1);

    // Set the maximum date for the from datepicker
    // const currentDate = new Date();
    // if (this.selectfromdate > currentDate) {
    //   this.maxDate = new Date(this.selectfromdate);
    // } else {
    //   this.maxDate = currentDate;
    // }
    // this.maxDate.setDate(this.maxDate.getDate() - 1);
  }


  getFromDateAndTime() {
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;

  }
  getToDateAndTime() {
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttodate.getHours()}:${this.selecttodate.getMinutes()}:${this.selecttodate.getSeconds()}`;
  }

  forevent() {
    let data = {
      "fromDate": this.getFromDateAndTime(),
      "toDate": this.getToDateAndTime()
    }
    this.auth.eventlists(data.fromDate, data.toDate).subscribe((resp) => {
   this.listevent = resp;
      console.log("event List = ", resp)
    })
  }
  getEventData(){
    this.forevent()
  }

  
}
