import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

export const AUTH_TOKEN = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static getToken() {
      throw new Error('Method not implemented.');
  }

  constructor(private cookieService:CookieService) { }

  setToken(token:any) {
    this.cookieService.set(AUTH_TOKEN, token);
    console.log(AUTH_TOKEN);
  }
  
  getToken() {
    if(this.getlocalToken()){
      return this.getlocalToken()
    }
    return this.cookieService.get(AUTH_TOKEN);
  }

  setLocalToken(token:any){
   return localStorage.setItem(AUTH_TOKEN , token)
  }

  getlocalToken(){
    return localStorage.getItem(AUTH_TOKEN)
  }
  async removeToken() {
    this.cookieService.delete(AUTH_TOKEN);
    this.cookieService.deleteAll();
    localStorage.clear();
    
    window.location.href = window.location.origin + window.location.pathname;
  }
}
