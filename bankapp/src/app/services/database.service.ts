import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// global overloading headers
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentuser=''
  currentacno=''
  userDetails: any

  constructor(private http:HttpClient) { 
   
  }

savedetails(){
  if(this.userDetails){
    localStorage.setItem("database",JSON.stringify(this.userDetails))
  }
  if(this.currentuser){
    localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
  }
  if(this.currentuser){
    localStorage.setItem('currentacno',JSON.stringify(this.currentacno))
  }
}

getdetails(){
  if(localStorage.getItem('database')){
    this.userDetails=JSON.parse(localStorage.getItem('database') || '')
  }

  if(localStorage.getItem('currentuser')){
    this.currentuser=JSON.parse(localStorage.getItem('currentuser') || '')
  }

  if(localStorage.getItem('currentacno')){
    this.currentacno=JSON.parse(localStorage.getItem('currentacno') || '')
  }

}

  // userDetails: any = {
  //   1000: { acnumber: 1000, username: "gokul", password: 123, balance: 0 ,transaction:[]},
  //   1001: { acnumber: 1001, username: "anu", password: 1234, balance: 0 ,transaction:[] },
  //   1002: { acnumber: 1002, username: "manu", password: 1235, balance: 0 ,transaction:[]},
  //   1003: { acnumber: 1003, username: "arun", password: 1236, balance: 0 ,transaction:[]}
  // }

gettoken(){
const token=JSON.parse(localStorage.getItem('token') || '')

let headers= new HttpHeaders()
if(token){
  option.headers= headers.append('access-token',token)
}
return option
}

  register(acnum: any, user: any, psw: any) {
    const data={
      acno:acnum,uname:user,psw
    }
    return this.http.post('http://localhost:3000/register',data)

    // var userDetails = this.userDetails
    // if (acnum in userDetails) {
    //   return false
    // }
    // else {
    //   userDetails[acnum] = { acnumber: acnum, username: user, password: psw, balance: 0,transaction:[] }
    //   console.log(userDetails);
    //   this.savedetails()
    //   return true
    // }
  }


  login(acno: any, psw: any) {

const data={
      acno,psw
    }
    return this.http.post('http://localhost:3000/login',data)
    // var userDetails = this.userDetails
    // if (acno in userDetails) {

    //   if (psw == userDetails[acno]["password"]) {
    //     alert("login succesfull")
    //     this. currentuser=userDetails[acno]["username"]
    //     this. currentacno=userDetails[acno]["acnumber"]
    //     this.savedetails()

    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // }
    // else {
    //   return false
    // }

  }
  Deposit(acno: any, password: any, amount: any) {
    var userDetails = this.userDetails
    var amnt = parseInt(amount)

    const data={
      acno,psw:password,amount
    }
    return this.http.post('http://localhost:3000/Deposit',data,this.gettoken())

    // if(acno in userDetails){
    //   if(password==userDetails[acno]["password"]){
    //     userDetails[acno]["balance"]+=amnt
    //     userDetails[acno]["transaction"].push({type:'CREDIT',amount:amnt})
    //     this.savedetails()

    //     return  userDetails[acno]["balance"]

    //   }
    //   else{
    //     return false
    //   }
    // }
    // else{
    //   return false
    // }

  }
  Withdraw(acno:any,password:any,amount:any){

    // var userDetails = this.userDetails
    // var amnt = parseInt(amount)

    const data={
      acno,psw:password,amount
    }
    return this.http.post('http://localhost:3000/Withdraw',data,this.gettoken())
    // var userDetails=this.userDetails
    // var amnt=parseInt(amount)

    // if(acno in userDetails){
    //   if(password==userDetails[acno]["password"]){
    //     if(amnt<=userDetails[acno]["balance"]){
    //       userDetails[acno]["balance"]-=amnt
    //       userDetails[acno]["transaction"].push({type:'DEBIT',amount:amnt})
    //       this.savedetails()

    //       return  userDetails[acno]["balance"]

    //     }
    //     else{
        
    //       alert('incufficent balance')
    //       return false
    //     }
    //   }
    //   else{
        
    //     alert('incurrect password')
    //     return false
    //   }

    // }
    // else{
     
    //  alert('inncrrect ac number')
    //   return false
    // }

  } 
  gettransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/gettransaction',data,this.gettoken())
  }
  deleteac(acno:any){
    return this.http.delete('http://localhost:3000/deleteac/'+acno,this.gettoken())
  }

} 
