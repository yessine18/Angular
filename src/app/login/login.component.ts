import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string=''
  password : string=''
  //injecftion de dep
  constructor(private AS : AuthService,private router: Router){}
  //type de thread = promise pour etre souscrit on utise .then
  login(){
      this.AS.signInWithEmailAndPassword(this.email,this.password).then(()=>{
        this.router.navigate(['/member'])
      })
  }

}
