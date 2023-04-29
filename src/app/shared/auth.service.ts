import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseId: string | undefined;
  data: any
  constructor(private fireauth: AngularFireAuth, private router: Router, private http: HttpClient,private token: TokenService) {
  }
  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
  //     localStorage.setItem('token', 'true');
  //     this.router.navigate(['dashboard']);
  //   }, err => {
  //     alert('somthing went wrong');
  //     this.router.navigate(['/login']);
  //   })
  // }

  //register method
  // register(email: string, password: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
  //     alert('registration successful');
  //     this.router.navigate(['/login'])
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/register'])
  //   })
  // }
  //sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token')
      this.router.navigate(['/'])
    }, err => {
      alert(err.message);
    })
  }

  registers() {
    this.registration(this.data).subscribe((resp: any) => {
      // let header = resp.token;
      localStorage.setItem('token',resp.token)
      console.log('google token',resp.token)
      localStorage.setItem('response', JSON.stringify(resp));
       if(resp.token!=null){
        this.token.setToken(localStorage.getItem('token'))
       }
    })
  }
 
  //sing in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      this.data = {
        "firebaseId": res.user?.uid,
        "userName": res.user?.displayName,
        "email": res.user?.email
      }
      // console.log("object data", this.data)

      // console.log(res.user)
      if (this.data.firebaseId) {
        this.registers();

      }
      else {
        console.log("No Data recived")
      }

      localStorage.setItem('token', JSON.stringify(res.user?.uid));

      this.router.navigate(['/main']);
    }, err => {
      alert(err.message)
    })
  }

  //sing in with facebook
  // facebookSignIn() {
  //   return this.fireauth.signInWithPopup(new FacebookAuthProvider).then((res) => {
  //     this.router.navigate(['/main']);
  //     localStorage.setItem('token', JSON.stringify(res.user?.uid));
  //   }, err => {
  //     alert(err.message)
  //   })


  // }

  // user crediential post api
  registration(data: any) {
    return this.http.post(`https://wrongpassapi.cricpayz.io:14442/api/register`, data)
  }
  // evnet list api
  eventlists(fromDate:string,toDate:string){
   return this.http.get(`https://wrongpassapi.cricpayz.io:14442/api/getEventList?fromDate=${fromDate}&toDate=${toDate}`)
  }
// team list api
  getTeamList(fromDate:string,toDate:string,eventid:number){
    return this.http.get(`https://wrongpassapi.cricpayz.io:14442/api/getTeamList?fromDate=${fromDate}&toDate=${toDate}&eventId=${eventid}`)
  }
// upload video api
  vedioUplad(videoData:any){
    return this.http.post(`https://wrongpassapi.cricpayz.io:14442/api/uploadVideo`,videoData)
  }
}
