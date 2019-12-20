import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from 'ng-gapi';
import { UserService } from './services/user.service';
import { MailService } from './services/mail.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { gapiClientConfig } from '../environments/gapiClientConfig';
import { AuthGuard } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './services/token.interceptor.service';
import { RedirectInterceptorService } from './services/redirect.interceptor.service';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule
} from '@angular/material';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, SidebarComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        }),
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatButtonModule
    ],
    providers: [
        UserService,
        MailService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RedirectInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
