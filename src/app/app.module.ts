import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule, DatePipe } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient,HttpClientModule} from '@angular/common/http'
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { GamelistComponent } from './gamelist/gamelist.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './shared/token.interceptor';
import { SearchwrapComponent } from './searchwrap/searchwrap.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    DashboardComponent,
    SearchwrapComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgProgressModule
  
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
