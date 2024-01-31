
// login.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://192.168.132.66:8080/api/auth';
  private currentUser: any;

  constructor(private router: Router, private userService: UserService) {}

  loginByHash(usernameOrEmail: string, password: string): Observable<Login> {
    const data = {
      usernameOrEmail: usernameOrEmail,
      password: password
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    return new Observable<Login>(observer => {
      axios.post<Login>(`${this.baseUrl}/login`, data, { headers: headers })
        .then(response => {
          // Save the token in localStorage
          const token = response.data.accessToken;
          localStorage.setItem('token', token);

          // Set user information in UserService
          this.userService.setUser(response.data);
          this.currentUser = response.data;
          console.log(this.currentUser.name);


          observer.next(response.data);
          observer.complete();
          console.log('LoginService - Current User:', this.currentUser);
        })
        .catch(error => {
          observer.error(error);
          console.log(error.response.data);
          console.error('LoginService - Login error:', error.response?.data || error.message);
        });
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists
  }

  getUserInfo(): any | null {
    const token = localStorage.getItem('token');
    
    // Implement logic to verify token and get user information
    // Adjust this logic based on your token verification implementation

    return token; // Return null for now, you need to implement this logic
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token in localStorage:', token);
    } else {
      console.log('No token found in localStorage');
    }
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

}

