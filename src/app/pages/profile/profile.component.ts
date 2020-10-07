import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/servies/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , OnDestroy {

  public currentUser: any = null;
  public user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) { 
    this.loadingService.isLoading.next(true)
  }
  ngOnDestroy() {
   this.subscriptions.forEach(sub => sub.unsubscribe());
   
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser= user ;
        this.loadingService.isLoading.next(false);
      })
    );
this.subscriptions.push(
  this.route.paramMap.subscribe( params => {
    const userId = params.get('userId');
    const userRef: AngularFirestoreDocument <User> = this.db.doc(`users/${userId}`);
    userRef.valueChanges().subscribe(user => this.user =user);
  })
)

  }

}
