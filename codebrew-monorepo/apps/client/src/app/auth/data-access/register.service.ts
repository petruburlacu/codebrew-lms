import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Credentials } from '@codebrew/shared-ui';
import { defer, from } from 'rxjs';
import { Constants } from '../../shared/utils/constants';

@Injectable()
export class RegisterService {

  public AUTH_URL = Constants.API_URL + '/auth';

  private http = inject(HttpClient);

  constructor() {
    console.log('RegisterService initialized');
  }

  public get() {
    console.log('RegisterService get');
  }

  register(credentials: Credentials) {
    return from(
      defer(() =>
        this.createUserWithEmailAndPassword(credentials)
      )
    );
  }

  createUserWithEmailAndPassword(credentials: Credentials) {
    const details =  {
        username: credentials.email,
        email: credentials.email,
        password: credentials.password,
    }
    return this.http.post('http://localhost:1337/api/auth/local/register', details);
      //This will be called from the angular universal nodeJs back-end and we should set
    //   HttpContext.Response.Cookies.Append("token", token, new CookieOptions { HttpOnly = true, Secure = true })
  }

  //should have external provider auth here
}
