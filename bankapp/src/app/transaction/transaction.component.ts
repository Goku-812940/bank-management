import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
acno:any
transaction:any

constructor(private ds:DatabaseService){
  
this.acno= JSON.parse(localStorage.getItem('currentacno') || "")

this.ds.gettransaction(this.acno).subscribe((result:any)=>{
  this.transaction=result.message
  console.log(this.transaction);
},
(result:any)=>{
  alert(result.error.message)
}

)


}
}
