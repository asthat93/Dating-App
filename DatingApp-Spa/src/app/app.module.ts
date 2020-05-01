import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { NavComponent } from './nav/nav.component'
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { MessagesComponent } from './messages/messages.component'
import { MemberListComponent } from './members/member-list/member-list.component'
import { ListsComponent } from './lists/lists.component'
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';


import { AuthService } from './_services/auth.Services'
import { UserService } from './_services/user.services '
import { AlertifyService } from './_services/alertify.services'
import { ErrorInterceptorProvider } from './_services/error.interceptor'
import { appRoutes } from './routes';

import { MemberDetailResolver } from './_reslover/member-detail.resolver';
import { MemberListResolver } from './_reslover/member-list.resolver';


export function tokengetter() {
  return localStorage.getItem('token')
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config:
      {
        tokenGetter: tokengetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes:['localhost:5000/api/auth']
      }
    })
  ],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService, UserService,
    MemberDetailResolver, MemberListResolver,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
