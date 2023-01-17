import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // user=''
  // acnum=''
  // psw=''

  constructor(private ds:DatabaseService,private router:Router,private fb:FormBuilder){
    
  }

  registerForm=this.fb.group({uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]})
  
  register(){
    var user=this.registerForm.value.uname
    var acnum=this.registerForm.value.acno
    var psw=this.registerForm.value.psw

    if(this.registerForm.valid){

    this.ds.register(acnum,user,psw).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')

    },
    result=>{
      alert(result.error.message)
      this.router.navigateByUrl('')

    }
    )

    // if(result){
    //   alert('registration sucessfull')
    //   this.router.navigateByUrl('')

    // }
    // else{
    //   alert('user already exist')
    //   this.router.navigateByUrl('')
    // }

  }
  else{
    alert('invalid form')
  }

  }
  
}
