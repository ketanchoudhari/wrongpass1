import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectfromdate: Date;
  selecttodate: Date;
  selectfromtime: Date;
  selecttotime: Date;
  listevent: any;
  searchResult = [];
  events: any[] = []; // this should be populated with the events from your API
  searchTerm: string = '';
  eventId: any;
  eventid: any = '';
  gamelist: any = [];
  videoNull: any = '';
  videoSession: any;
  p: number = 1;
  selection: any;
  fileToUpload: File | null = null;
  vidEventId: any;
  file: any;
  eventiddata: any;
  selctionid: any;
  urlvideo: any;
  videopathValid:any;
  // month;

  constructor(private auth: AuthService) {
    this.selectfromdate = new Date(new Date(new Date().setDate(new Date().getDate() - 30)).setHours(9, 0, 0));
    this.selecttodate = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(8, 59, 59));
    this.selectfromtime = new Date(new Date().setHours(0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0));

  }

  ngOnInit(): void {
    this.forevent();
    this.getitemlist();

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
      this.listevent = resp

      console.log("event List = ", resp)
      this.filterEvents()
    })
  }

  filterEvents() {
    // use the listevent array to filter the events based on the event name
    this.events = this.listevent.filter((event: { name: string; }) => event.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  getEventData() {
    this.forevent()
    // this.searchResult = [];
    // if (this.searchText.length >= 3) {
    //   _.forEach(this.eventsList, (element, index) => {
    //     if (element.eventName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0) {
    //       this.searchResult.push(element);
    //     }
    //   });
  }
  onchange(e: any) {
    this.eventid = e;
    console.log("event Id on Onchange search list", this.eventid)
    this.getitemlist();
  }
  getitemlist() {
    this.videoList();
    let data = {
      "fromDate": this.getFromDateAndTime(),
      "toDate": this.getToDateAndTime()
    }
    this.auth.getTeamList(data.fromDate, data.toDate, this.eventid).subscribe((resp: any) => {

      this.gamelist = resp.data;
      // this.videoNull= resp.data.videoPath;
      console.log(this.gamelist, "data");

      // console.log("video null or not",this.videoNull)
    })
  }

  upload(e: any) {
    this.videoSession = e;
    console.log("selection id from change", this.videoSession)

  }
  onFileSelected(e: any, selectionid: any, eveniddata: any) {
    const file = e.target.files[0];
    if (e.target.files) {
      var render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.onload = (event: any) => {
        console.log(event.target.result)
        this.file = event.target.result
      }

    }
    console.log(this.file)
    this.eventiddata = eveniddata;
    this.selctionid = selectionid
    this.uploadfile();
  }
  onSelectFile(e: any, selectionid: any, eveniddata: any,videopath:any) {
    if(videopath!==null){
     this.videopathValid=videopath;
    }
    const file = e.target.files && e.target.files[0];
    // this.urlvideo =file
    console.log(file)
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      // if(file.type.indexOf('image')> -1){
      //   this.format = 'image';
      // } else if(file.type.indexOf('video')> -1){
      //   this.format = 'video';
      // }
      reader.onload = (event) => {
        this.urlvideo = (<FileReader>event.target).result;
      }
    }
    console.log(this.urlvideo)
    this.eventiddata = eveniddata;
    this.selctionid = selectionid

  }

  uploadfile() {
    let body = new FormData();
      body.append('video', this.urlvideo),
      body.append('selectionId', this.selctionid),
      body.append('eventId', this.eventiddata),
      // let body={
      //   'video':this.urlvideo,
      //   'selectionId':this.selctionid,
      //   'eventId':this.eventiddata
      // }
     console.log(body)
    this.auth.vedioUplad(body).subscribe(async (resp: any) => {
      console.log("response form video api", resp)

    })
  }

  videoList() {
    let data = {
      "fromDate": this.getFromDateAndTime(),
      "toDate": this.getToDateAndTime()

    }
    this.auth.getTeamList(data.fromDate, data.toDate, this.eventid).subscribe((resp: any) => {


      console.log("###################")
      // this.selection= resp.data.selectionId;
      // console.log("selection Id",this.selection)
      // if(this.gamelist.data.videoPath){
      //   console.log("video is present")
      // }
      // else{
      //   console.log("video path is null")
      // }

    })
  }
}





