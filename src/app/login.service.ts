import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(protected http: HttpClient, private authService: AuthService) {
        this.authService.authState.subscribe((user) => { 
            console.log(user);
            this.onSignIn(user);
        });
    }

    isLoggedIn: boolean;
    name: string;
    idToken: string;
    
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        if(this.isLoggedIn) {
            this.authService.signOut();
        }
    }

    onSignIn(user: any) {
        if(user == null) { 
            this.isLoggedIn = false;
            return; 
        }
        var idToken = user.idToken;
        this.idToken = user.idToken;
        this.name = user.name;
        
        var url = window.location.protocol + '//' + window.location.host + '/users';

        this.http.post(url, null, { headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': idToken}), observe: 'response'}).subscribe(res => {
            console.log(res.status);
            if(res.status == 201) {
                this.isLoggedIn = true;
            } else if(res.status == 204) {
                this.isLoggedIn = true;
            } else {
                console.log('Unknown response from /users: ' + res.status);
            }
        });
    }
}
