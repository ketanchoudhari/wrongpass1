import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  
  selectfromdate: any;

  selecttodate!: Date;
  selecttotime!: Date;
  selectfromtime!: Date;
 month;
  constructor(private auth:AuthService) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.month = new Date(new Date().setDate(new Date().getDate() - 30));

   }

  ngOnInit(): void {
    this.selectfromdate = new Date(new Date().setHours(9, 0, 0));
    this.selecttodate = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(8, 59, 59));

    this.selectfromtime = new Date(new Date().setHours(9, 0, 0));
    this.selecttotime = new Date(new Date().setHours(8, 59, 0));
  }

}
