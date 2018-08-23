import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AppComponent } from './app.component';
import { SpaceComponent } from './space/space.component';
import { LoginService } from './login.service';

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("893216655393-43s8tkkak2nj01r9anm958hharqib468.apps.googleusercontent.com")
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SpaceComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      SocialLoginModule
  ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        LoginService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
