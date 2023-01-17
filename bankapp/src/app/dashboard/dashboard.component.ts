import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


user=''
acno:any
dateandtime:any

constructor(private ds:DatabaseService,private fb:FormBuilder,private router:Router){

  this.dateandtime=new Date()

  if(localStorage.getItem ('currentuser'))
{ 
   this.user=JSON.parse(localStorage.getItem('currentuser') || '')
}}

ngOnInit():void{
if(!localStorage.getItem('token')){
  alert('please login first')
  this.router.navigateByUrl('')
}
}

depositform=this.fb.group({acno:[''],psw:[''],amnt:['']})

  Deposit(){
    var acno=this.depositform.value.acno
    var psw=this.depositform.value.psw
    var amnt=this.depositform.value.amnt

  this.ds.Deposit(acno,psw,amnt).subscribe((result:any)=>{
    alert(`${amnt}credited to your ac and the balance is${result.message}`)
  },
 result=>{
  alert(result.error.message)
 }
  )
    // if(result){
    //   alert(`${amnt}credited to your ac and the balance is${result}`)
    // }
    // else{
    //   alert('incurrect ac number or password')
    // }
  }

  withdrawform=this.fb.group({acno1:[''],psw1:[''],amnt1:['']})

  Withdraw(){
    var acno1=this.withdrawform.value.acno1
    var psw1=this.withdrawform.value.psw1
    var amnt1=this.withdrawform.value.amnt1
    
    this.ds.Withdraw(acno1,psw1,amnt1).subscribe((result:any)=>{
      alert(`${amnt1}debited from  your ac and the balance is${result.message}`)
    },
    result=>{
      alert(result.error.message)
    }
    )
    // if(result){
    //   alert(`${amnt1}debited from  your ac and the balance is${result}`)
    // }
 
  }
  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
    localStorage.removeItem('token')

    this.router.navigateByUrl('')
  }
  deleteconfirm(){

  this.acno=JSON.parse(localStorage.getItem('currentacno') || '')

  }
  oncancel(){
    this.acno=""
  }
  delete(event:any){

    this.ds.deleteac(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout()
      
    },
    result=>{
      alert(result.error.message)
    }
    )
    // alert(event)
  }
}
