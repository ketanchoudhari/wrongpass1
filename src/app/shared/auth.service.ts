import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  res:any;
  constructor(private fireauth:AngularFireAuth, private router: Router) { }
  login(email: string, password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);
    },err=>{
      alert('somthing went wrong');
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('registration successful');
      this.router.navigate(['/login'])
    },err=>{
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }
  //sign out
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    },err=>{
      alert(err.message);
    })
  }

  //sing in with google
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(()=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(this.res.user?.uid));
    },err=>{
      alert(err.message)
    })
  }

}
