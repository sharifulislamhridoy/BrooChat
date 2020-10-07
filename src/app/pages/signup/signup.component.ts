import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/servies/loading.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {

  public signupForm: FormGroup;
  private subscriptions:Subscription[]=[];


  constructor(
    private fb: FormBuilder,
    private alertService:AlertService,
    private auth: AuthService,
    private loadingService:LoadingService,
    private router:Router

    ) {
    this.createForm();
   }
  ngOnDestroy(): void {
   this.subscriptions.forEach(sub =>sub.unsubscribe());
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    
    if(this.signupForm.valid){
      const {firstName, lastName, email, password} = this.signupForm.value;
// TODO call the auth service
     this.subscriptions.push(
       this.auth.signup(firstName,lastName,email,password).subscribe(success =>{
         if(success){
           this.router.navigate(['/chat']);
         }else{
           const failedSignidAlert=new Alert('There was a problem singing Up, try again ',AlertType.Danger);
         this.alertService.alerts.next(failedSignidAlert);
          }
         this.loadingService.isLoading.next(false);
       })
     );
    }else{
      const failedSignidAlert = new Alert('Please Enter a valid name, email and password, try again',AlertType.Danger);
      this.alertService.alerts.next(failedSignidAlert)
    }
    
  }

}
