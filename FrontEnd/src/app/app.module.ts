import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Import Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UseTabComponent } from './components/use-tab/use-tab.component';
import { StudentProfileComponent } from './components/studentProfile/studentProfile.component';
import { SkillComponent } from './components/skill/skill.component';
import { EducationComponent } from './components/education/education.component';
import { UpdateInternshipComponent } from './components/update-internship/update-internship.component';
import { AddInternshipComponent } from './components/add-internship/add-internship.component';
import { InternshipDetailsComponent } from './components/internship-details/internship-details.component';
import { InternshipComponent } from './components/internship/internship.component';
import { FavorisComponent } from './components/favoris/favoris.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    FooterComponent,
    UseTabComponent,
    StudentProfileComponent,
    SkillComponent,
    EducationComponent,
    UpdateInternshipComponent,
    AddInternshipComponent,
    InternshipDetailsComponent,
    InternshipComponent,
    FavorisComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true // Use multiple interceptors if needed
     
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
