import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

import { User } from "../helper/User";
import { RegisterUser } from "../helper/RegisterUser";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem("access_token") || "{}";
  }

  public readToken(): User {
    const token = localStorage.getItem("access_token");
    return helper.decodeToken("acess_token") || "{}";
  }

  public isAuthenticated(): Boolean {
    const token = localStorage.getItem("access_token");
    if (token) return true;
    else return false;
  }

  public login(user: User): Observable<any> {
    return this.http.post(environment.userAPIBase + "/login", user);
  }

  public logout() {
    localStorage.removeItem("access_token");
  }

  public register(registerUser: RegisterUser): Observable<any> {
    return this.http.post(environment.userAPIBase + "/register", registerUser);
  }
}
