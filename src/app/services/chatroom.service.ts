import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoadingService } from './../servies/loading.service';
import { AuthService } from './auth.service';

@Injectable()
export class ChatroomService {

public chatrooms: Observable<any>;
public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
public selectedChatroom:Observable<any>;
public selectedChatroomMessages:Observable<any>;


  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService:AuthService
  ) {
    this.selectedChatroom = this.changeChatroom.switchMap(chatroomId =>{
      if(chatroomId){
  
        return db.doc(`chaterooms/${chatroomId}`).valueChanges();
      }
      return Observable.of(null);
    });

 this.selectedChatroomMessages = this.changeChatroom.switchMap(chatroomId => {
      if (chatroomId) {
        return db.collection(`chaterooms/${chatroomId}/messages`, ref => {
          return ref.orderBy('createAt', 'desc').limit(100);
        })
        .valueChanges()
        .map(arr => arr.reverse());
      }
      return Observable.of(null);
    });
    this.chatrooms= this.db.collection('chaterooms').valueChanges();
   }
   public createMessage(text:string):void{
     const chatroomId = this.changeChatroom.value;
     const message = {
       message:text,
       createAt:new Date(),
       sender:this.authService.currentUserSnapshot
     };
     this.db.collection(`chaterooms/${chatroomId}/messages`).add(message);
   }
}
