import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <div class="landing-page"> 
    <h1 class="landing-page__title">Welcome to the Expense Tracking System</h1> 
     
    <p class="landing-page__paragraph"> 
      The Expense Tracking System is built using the MEAN stack, which includes 
      MongoDB, Express.js, Angular, and Node.js. This stack provides a robust and 
      scalable solution for building modern web applications. 
    </p> 

    <p class="landing-page__paragraph"> 
      The Expense Tracking System (ETS) is an application where users can manage 
      their own personal finances. Users are able to use this application to their 
      liking from keeping track of their daily expenses to categorizing and 
      analyzing their spending habits.
    </p> 

    <p class="landing-page__paragraph"> 
      The purpose we aim with this application is to let the user be in charge. 
      We are allowing the users to use this application as a way so they can have 
      a tracker of their spending and we want the users to feel like they have 
      control of that. Letting users have the ability to create, modify, see, and 
      delete their expenses will give them that as well as letting them organize 
      them into categories that they want. 
    </p> 
  </div>
  `,
  styles: `
  .landing-page { 
max-width: 80%; 
margin: 0 auto; 
padding: 20px; 
} 
.landing-page__title { 
color: #563d7c; /* Bootstrap's purple color */ 
} 
.landing-page__paragraph { 
font-size: 1.2em; 
line-height: 1.5; 
margin-bottom: 20px; 
}`
})
export class HomeComponent {
  serverMessage: string;

  constructor(private http: HttpClient) {
    this.serverMessage = '';

    // Simulate a server request that takes 2 seconds to complete
    setTimeout(() => {
      this.http.get(`${environment.apiBaseUrl}/api`).subscribe({
        next: (res: any) => {
          this.serverMessage = res['message'];
        },
        error: (err) => {
          this.serverMessage = 'Error loading server message';
        }
      });
    }, 2000);
  }
}
