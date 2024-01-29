// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';
// // import axios from 'axios';
// // import { Login } from '../model/login.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class LoginService {
// //   private baseUrl = 'http://172.20.10.3:8080/api/auth';

// //   constructor() { }

// //   loginByHash(usernameOrEmail: string, password: string): Observable<Login> {
// //     // Creating FormData object
// //     const formData = new FormData();
// //     formData.append('usernameOrEmail', usernameOrEmail);
// //     formData.append('password', password);
// //     console.log(formData);

// //     // Using Axios for the HTTP request with form data
// //     return new Observable<Login>(observer => {
// //       axios.post<Login>(`${this.baseUrl}/login`, formData)
// //         .then(response => {
// //           console.log(response.data);
// //           observer.next(response.data);
// //           observer.complete();
// //         })
// //         .catch(error => {
// //           observer.error(error);
// //           console.log(error.data);
// //         });
// //     });
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import axios from 'axios';
// import { Login } from '../model/login.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private baseUrl = 'http://172.20.10.3:8080/api/auth';

//   constructor() { }

//   loginByHash(usernameOrEmail: string, password: string): Observable<Login> {
//     const data = {
//       usernameOrEmail: usernameOrEmail,
//       password: password
//     };

//     const headers = {
//       'Content-Type': 'application/json'
//     };

//     return new Observable<Login>(observer => {
//       axios.post<Login>(`${this.baseUrl}/login`, data, { headers: headers })
//         .then(response => {
//           console.log(response.data);
//           observer.next(response.data);
//           observer.complete();
//         })
//         .catch(error => {
//           observer.error(error);
//           console.log(error.response.data);
//         });
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://172.20.10.3:8080/api/auth';

  constructor(private router: Router ) { }

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
          console.log(response.data);

          // Save the token in localStorage
          const token = response.data.accessToken;
          localStorage.setItem('token', token);

          // Log localStorage
          

          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          console.log(error.response.data);
        });
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists
  }

  getUserInfo(): any | null {
    const token = localStorage.getItem('token');
    
    // Implementasi logika verifikasi token dan mendapatkan informasi user
    // Pastikan untuk menyesuaikan dengan format dan algoritma verifikasi token Anda

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


  // Fungsi untuk menampilkan isi localStorage di konsol
  // logLocalStorage() {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     console.log('Token in localStorage:', token);
  //   } else {
  //     console.log('No token found in localStorage');
  //   }
  // }
}
