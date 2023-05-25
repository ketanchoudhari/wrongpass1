import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToasterMessageService } from '../shared/toaster-message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectfromdate: Date;
  selecttodate: Date;
  selectfromtime: Date;
  selecttotime: Date;
  searchTerm: string = '';
  gamelist: any = [];
  filteredEventList: any = [];
  p: number = 1;
  showLoader: boolean = false;
  isLoading: boolean = true;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private toastServ: ToasterMessageService
  ) {
    this.selectfromdate = new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(9, 0, 0)
    );
    this.selecttodate = new Date(
      new Date(new Date().setDate(new Date().getDate())).setHours(8, 59, 59)
    );
    this.selectfromtime = new Date(new Date().setHours(0, 0, 0));
    this.selecttotime = new Date(new Date().setHours(23, 59, 0));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getEventList();
    }, 2000); // 5000 milliseconds = 5 seconds

    this.isLoading;
  }

  getFromDateAndTime() {
    return `${this.selectfromdate.getFullYear()}-${
      this.selectfromdate.getMonth() + 1
    }-${this.selectfromdate.getDate()} ${this.selectfromdate.getHours()}:${this.selectfromdate.getMinutes()}:${this.selectfromdate.getSeconds()}`;
  }
  getToDateAndTime() {
    return `${this.selecttodate.getFullYear()}-${
      this.selecttodate.getMonth() + 1
    }-${this.selecttodate.getDate()} ${this.selecttodate.getHours()}:${this.selecttodate.getMinutes()}:${this.selecttodate.getSeconds()}`;
  }

  search(e: any) {
    if (e.length > 0) {
      this.filteredEventList = this.gamelist.filter((item: any) =>
        item.eventName.toLowerCase().includes(e.toLowerCase())
      );
    } else {
      this.filteredEventList = this.gamelist;
    }
  }

  getEventList() {
    let data = {
      fromDate: this.getFromDateAndTime(),
      toDate: this.getToDateAndTime(),
    };
    this.auth.getEventList(data.fromDate, data.toDate).subscribe(
      (resp: any) => {
        if (resp.message == 'No Events Found') {
          this.isLoading = false;
          this.gamelist = null;
          // console.log("No event found")
        }
        if (resp) {
          if (resp.status == 'Success') {
            this.isLoading = false;
            this.gamelist = resp.data;
            this.gamelist.forEach((element: any) => {
              if (element.showProgressBar == undefined) {
                element['showProgressBar'] = false;
              }
              if (element.urlvideo == undefined) {
                element['urlvideo'] = null;
              }
              if (element.fileName == undefined) {
                element['fileName'] = '';
              }
              if (element.progress == undefined) {
                element['progress'] = 0;
              }
            });
            this.filteredEventList = this.gamelist;
          }
        } else {
          // Handle other error codes here
          console.log('Error code: ' + resp.code);
        }
        this.ngOnInit;
      },
      (error) => {
        // Handle HTTP errors here
        console.log('HTTP error: ' + error.status);
      }
    );
  }

  download(game: any) {
    game.showLoader = true;
    // this.showLoader = true;
    const staticDomain = 'https://wrongpassapi.cricpayz.io/';
    const downloadUrl = staticDomain + game.videoPath;
    this.http
      .get(downloadUrl, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        // let fileName = response.headers.get('videoPath')
        const url = URL.createObjectURL(response);
        // console.log("response of download",response)
        if (response.size) {
          game.showLoader = false;
        }
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        a.click();
        URL.revokeObjectURL(url);
      });
      this.ngOnInit
  }

  uploadfile(game: any) {
    game.showProgressBar = true;
    let body = new FormData();
    body.append('video', game.urlvideo),
      body.append('eventId', game.eventId),
      this.auth.vedioUpload(body).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            game.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            game.showProgressBar = false;
            const index = this.filteredEventList.findIndex((event:any) => event.eventId === game.eventId);
            this.filteredEventList[index].videoPath = event.body.video_path
            const index2 = this.gamelist.findIndex((event:any) => event.eventId === game.eventId);
            this.gamelist[index2].videoPath = event.body.video_path
            this.toastServ.showInfo('Video uploaded successfully');
          }
          this.ngOnInit;
        },
        (error: any) => {
          game.showProgressBar = false;
        }
      );
  }

  onFileSelected(event: any, game: any) {
    const file: File = event.target.files[0];
    if (file) {
      game.fileName = file.name;
      game.urlvideo = file;
    }
  }
}
