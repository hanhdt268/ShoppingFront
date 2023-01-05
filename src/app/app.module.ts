import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './pages/user/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { authInterceptorProvides } from './services/auth.interceptor';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule


    ],
  providers: [authInterceptorProvides],
  bootstrap: [AppComponent]
})
export class AppModule { }
