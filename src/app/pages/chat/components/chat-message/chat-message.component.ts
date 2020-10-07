// import { Message } from './../../../../classes/message';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/classes/message';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;

  constructor() {
   }

  ngOnInit() {
    console.log(this.message.createdAt)
  }

}
