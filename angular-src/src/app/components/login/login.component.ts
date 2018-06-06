import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private auth:AuthService,
    private msg:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
  }
onLoginSubmit(){
  const user={
    username:this.username,
    password:this.password
  }
  this.auth.authenticateUser(user).subscribe(data =>{
    if(data.success){
      this.auth.storeUserData(data.token,data.user);
      this.msg.show('Your are succesfully logIn..', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/dashboard']);
    }else{
      this.msg.show('User name or password is incorrect...please try again !!', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/login']);
    }
  });
}

}
