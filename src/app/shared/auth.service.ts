import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterMessageService } from './toaster-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseId: string | undefined;
  data: any
  baseURL='https://wrongpassapi.cricpayz.io:14442/api';
  constructor(private fireauth: AngularFireAuth,
     private router: Router
     , private http: HttpClient,
     private token: TokenService,
     private toastr : ToastrService,
     private toastServ:ToasterMessageService
     ) {
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
      localStorage.clear()
      this.router.navigate(['/'])
      this.toastServ.showWarning("Logout Successfully")
    }, err => {
      console.log(err.message);
    })
  }

  registers() {
    this.registration(this.data).subscribe((resp: any) => {
      // let header = resp.token;
      this.token.setToken(resp.token)
      this.token.setLocalToken(resp.token)
      localStorage.setItem('token',resp.token)
       if(resp.token!=null){
         this.token.setToken(localStorage.getItem('token'))
       }
    })
    return this.token.getlocalToken()
  }
  authToken(){
   let tokens= localStorage.getItem('token')
   if(tokens!==undefined && tokens !== null){
    return true
   }
   else{
    return false
   }
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
        this.toastServ.showSuccess('Login Successfully');
        this.registers();

      }
      else {
        console.log("No Data recived")
      }

      localStorage.setItem('token', JSON.stringify(res.user?.uid));

      this.router.navigate(['/main']);
    }, err => {
      if(err.code!='auth/popup-closed-by-user'){
        console.log(err.message)
      }
    })
  }
  // user crediential post api
  registration(data: any) {
    return this.http.post(`${this.baseURL}/register`, data)
  }

// event list api
  getEventList(fromDate:string,toDate:string){
    return this.http.get(`${this.baseURL}/getTeamList?fromDate=${fromDate}&toDate=${toDate}`)
  }
// upload video api
  vedioUpload(videoData:any){
    return this.http.post(`${this.baseURL}/uploadVideo`,videoData,{reportProgress: true, observe: 'events'})
  }
}
