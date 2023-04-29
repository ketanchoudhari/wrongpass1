import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchwrap',
  templateUrl: './searchwrap.component.html',
  styleUrls: ['./searchwrap.component.css']
})
export class SearchwrapComponent {
  eventsList = [];

  searchText: string = "";
  searchResult = [];
  eventSubscription: Subscription | undefined;
  Update: any;
  constructor(private auth:AuthService){}

  // SearchEvents() {
  //   this.eventSubscription=this.auth.eventlists().subscribe((resp) => {
      
  //        console.log("event List = ", resp)
  //      })
  // }

}
