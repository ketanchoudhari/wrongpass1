import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import {GoogleAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    const v: HTMLCanvasElement = document.querySelector("#c")!;
const c: CanvasRenderingContext2D = v.getContext("2d")!;
let l: number = 2.5;
const r = (i: number): number => Math.random() * i;
let s: { c: string; x: number; y: number; v: number }[] = [];
let w: number;
let h: number;
let n: number;

(window.onresize = () => {
  s = [];
  w = innerWidth;
  h = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  n = Math.random() * 100 + w / 5;
  v.width = w;
  v.height = h;
  for (let i = 0; i < n; i++) {
    s.push({ c: `rgb(${r(255)},${r(255)},${r(255)})`, x: r(w), y: r(h), v: r(3) + 1 });
  }
})();

setInterval(() => {
  c.clearRect(0, 0, w, h);
  for (let b of s) {
    c.shadowBlur = 10;
    c.shadowColor = b.c;
    c.fillStyle = b.c;
    c.beginPath();
    c.arc(b.x, b.y, l, 0, 7);
    c.fill();
    b.y -= b.v;
    b.y = b.y < -l ? h : b.y;
  }
}, 50);

  }
  // google signin
  signInWithGoogle(){
  this.auth.googleSignIn();
  }
  singInWithFacebook(){
    this.auth.facebookSignIn();
  }
}
