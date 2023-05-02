import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToasterMessageService } from '../shared/toaster-message.service';

// import { VideoEncoder } from 'video-encoder';




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
  listevent: any =[];
  searchResult = [];
  events: any[] = []; // this should be populated with the events from your API
  searchTeam: string = '';
  eventid: any = '';
  gamelist: any = [];
  videoNull: any = '';
  videoSession: any;
  p: number = 1;
  selection: any;
  // fileToUpload: File | null = null;
  // vidEventId: any;
  // file: any;
  // eventiddata: any;
  // selctionid: any;
  // urlvideo: any;
  videopathValid:any;
  // respTeamList: any;
  // headertest: any;
  // month;
//   fileName=""
  progressRef: any;
//   showProgressBar: boolean = false;
progressValue: number = 0;
//   progressEvent: any;

  constructor(private auth: AuthService,
    private http:HttpClient,
    private toastServ:ToasterMessageService
    ) {
    this.selectfromdate = new Date(new Date(new Date().setDate(new Date().getDate() - 30)).setHours(9, 0, 0));
    this.selecttodate = new Date(new Date(new Date().setDate(new Date().getDate())).setHours(8, 59, 59));
    this.selectfromtime = new Date(new Date().setHours(0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0));
  }

  ngOnInit(): void {
    this.forevent();
    this.getitemlist();

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

      // console.log("event List = ", resp)
      this.filterEvents()
    })
  }

  filterEvents() {
    // use the listevent array to filter the events based on the event name
    if(this.listevent.length>0){
      this.events = this.listevent.filter((event: { name: string; }) => event.name.toLowerCase().includes(this.searchTeam.toLowerCase()));
    }
  }
  onchange(e: any) {
    this.eventid = e;
    // console.log("event Id on Onchange search list", this.eventid)
    this.getitemlist();
  }
  getitemlist() {
    let data = {
      "fromDate": this.getFromDateAndTime(),
      "toDate": this.getToDateAndTime()
    }
    this.auth.getTeamList(data.fromDate, data.toDate, this.eventid).subscribe((resp: any) => {

      this.gamelist = resp.data;
      this.gamelist.forEach((element:any) => {        
        if(element.showProgressBar==undefined){
          element['showProgressBar'] = false;
        }
        if(element.urlvideo==undefined){
          element['urlvideo'] = null
        }
        if(element.fileName==undefined){
          element['fileName'] = ""
        }
        if(element.progress==undefined){
          element['progress'] = 0
        }
      });
      // this.videoNull= resp.data.videoPath;
      // console.log(this.gamelist, "data");

      // console.log("video null or not",this.videoNull)
    })
  }

  // upload(e: any) {
  //   this.videoSession = e;
  //   console.log("selection id from change", this.videoSession)

  // }
  download(path:any){
    const staticDomain='https://wrongpassapi.cricpayz.io/';
    const downloadUrl = staticDomain + path;
    this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // let fileName = response.headers.get('videoPath')
        const url = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        a.click();
        URL.revokeObjectURL(url);
      },)

  }

  // onSelectFile(e: any, selectionid: any, eveniddata: any,videopath:any) {
  //   if(videopath!==null){

  //   }
  //   const file = e.target.files && e.target.files[0];
 
  //   console.log("onSelectFile ",file)
  //   if (file) {

  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     console.log("file reader ",reader)
  //     reader.onload = (event) => {
  //       e.urlvideo = (<FileReader>event.target).result;
  //     }
  //   }
  //   console.log("video url data ",e.urlvideo)
  // }

  uploadfile(game: any) {
    game.showProgressBar = true;
    let body = new FormData();
    body.append('video', game.urlvideo),
    body.append('selectionId', game.selectionId),
    body.append('eventId', game.eventId),
    this.auth.vedioUpload(body ).subscribe((event: any) => {
      // console.log(event);
      
      if (event.type === HttpEventType.UploadProgress) {
        game.progress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        game.showProgressBar = false;
        this.toastServ.showInfo('Video uploaded successfully')
      }  
    }, (error: any) => {
      console.error("video upload error", error);
      game.showProgressBar = false;
    });
  }

  onFileSelected(event:any,game:any) {
    const file: File = event.target.files[0];
    // console.log(file)
    if (file) {
      game.fileName = file.name;
      game.urlvideo = file;
    }
    // console.log(game)
  }
}





