import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {of, throwError} from "rxjs";

export interface CredentialInterface{
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly CREDENTIAL_KEY_NAME: string = 'login-data';
  readonly USER_DATA_KEY_NAME: string = 'user-data';
  private __loggedInUser__: any; // logged in user data
  private __savedCredentials__: any; // storing the credentials in service because no need to call or load json file again
  constructor(private http: HttpClient) { }

  getList(isFetchFromAPi?: boolean){
    const usersData = localStorage.getItem(this.USER_DATA_KEY_NAME);
    if(usersData && !isFetchFromAPi){
      // Checking via cached data no need to load json file again
      return of(this.getUserDataInJsonObject(usersData));
    }else {
      // if cached is not there then we have to load json file again
      return this.http.get('https://randomuser.me/api/0.8?results=20')
        .pipe(map((data: any) => {
          let list = data.results;
          list =  JSON.stringify(list);
          localStorage.setItem(this.USER_DATA_KEY_NAME, list);
          return data.results;
        }), catchError((error) => {
          return throwError(error);
        }));
    }
  }

  getUserDataInJsonObject(usersData: string){
    let userList = [];
    try{
      userList = JSON.parse(usersData);
    }catch(e){
    }
    return userList;
  }

  add(userData: any){
    let storedUserList: any = localStorage.getItem(this.USER_DATA_KEY_NAME);
    if(storedUserList){
      storedUserList = this.getUserDataInJsonObject(storedUserList);
    }else {
      storedUserList = [];
    }
    storedUserList.unshift({user: userData});
    localStorage.setItem(this.USER_DATA_KEY_NAME, JSON.stringify(storedUserList));
    return of({
      status: 'success',
      code: 200,
      message: 'Success!'
    });
  }

  login(credential: CredentialInterface){
    if(this.__savedCredentials__ && this.__savedCredentials__.username){
      // Checking via cached data no need to load json file again
      return of(this.getResAfterCheckLoginCredentials(this.__savedCredentials__, credential));
    }else {
      // if cached is not there then we have to load json file again
      return this.http.get('/assets/credentials.json')
        .pipe(map((data: any) => {
          this.__savedCredentials__ = data;
          return this.getResAfterCheckLoginCredentials(data, credential);
        }), catchError((error) => {
          return throwError(error);
        }));
    }
  }

  // it checks Credential of a user an give data to to send to component
  getResAfterCheckLoginCredentials(originalData: CredentialInterface, passedData: CredentialInterface){
    if(originalData.username === passedData.username && originalData.password === passedData.password){
      this.__loggedInUser__ = originalData;
      localStorage.setItem(this.CREDENTIAL_KEY_NAME, btoa(JSON.stringify(originalData)))
      return {
        status: 'success',
        code: 200,
        message: 'Logged in successfully!'
      }
    }
    return {
      status: 'failed',
      code: 400,
      message: 'There is an error, please try again!'
    }
  }

  // return boolean if user is logged in or not
   isLoggedIn(){
    return !!this.__loggedInUser__;
  }

  logout(){
    localStorage.removeItem(this.CREDENTIAL_KEY_NAME);
    window.location.reload();
  }
}
