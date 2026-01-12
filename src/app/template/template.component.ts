import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
   constructor(private AS: AuthService, private router: Router) {}

  logout() {
    this.AS.signOut().then(() => {
      this.router.navigate(['/login']); // redirection vers login
    })
  }
}
