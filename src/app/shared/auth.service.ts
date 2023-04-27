import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseId: string | undefined;
  data: any
  constructor(private fireauth: AngularFireAuth, private router: Router, private http: HttpClient) {
  }
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert('somthing went wrong');
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('registration successful');
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }
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
      console.log(resp)
      localStorage.setItem('response', JSON.stringify(resp));
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
  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then((res) => {
      this.router.navigate(['/main']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message)
    })


  }
  // user crediential post api
  registration(data: any) {
    return this.http.post(`https://wrongpassapi.cricpayz.io:14442/api/register`, data)
  }
  eventlists(){
   return this.http.get(`https://wrongpassapi.cricpayz.io:14442/api/getEventList?fromDate=2023-04-26 18:45:00&toDate=2023-04-26 20:30:00`)
  }
}
