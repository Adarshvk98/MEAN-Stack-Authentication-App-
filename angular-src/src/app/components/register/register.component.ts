import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 name: String;
 username: String;
 email: String;
 password: String;


  constructor(private validate:ValidateService,
     private msg:FlashMessagesService,
     private auth:AuthService,
     private router:Router
   ) { }

  ngOnInit() {
  }
onRegisterSubmit(){
  const user={
    name:this.name,
    username:this.username,
    email:this.email,
    password:this.password
  }
  if(!this.validate.validateRegister(user)){
   this.msg.show('please enter the required feild..!', { cssClass: 'alert-danger', timeout: 3000 });
    return false;
  }
  if(!this.validate.validateEmail(user.email)){
    this.msg.show('please enter a valid mail id..!', { cssClass: 'alert-danger', timeout: 3000 });
    return false;
  }
  //register
  this.auth.registerUser(user).subscribe(data =>{
  if(data.success){
    this.msg.show('Registered succesfully', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }else{
    this.msg.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    this.router.navigate(['/register']);
  }
});

}

}
