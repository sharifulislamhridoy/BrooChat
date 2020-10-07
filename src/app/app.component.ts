import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './servies/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
 private subscriptions:Subscription[]=[];
  public alerts:Array<Alert>=[];
 private loading : boolean = false ;

 constructor(
   private alertService:AlertService,
   private loadingService :LoadingService
   ){}
  
 ngOnInit(){
   this.subscriptions.push(
    this.alertService.alerts.subscribe(alert=>{
      console.log('alert:',alert.text)
      this.alerts.push(alert);
     })
   )
this.subscriptions.push(
  this.loadingService.isLoading.subscribe(isLoading =>{
    this.loading = isLoading;
  })
)
 }
 ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}
}
