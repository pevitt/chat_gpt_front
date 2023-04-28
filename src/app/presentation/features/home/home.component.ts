import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile, IMessage } from 'src/app/data/interfaces/auth.models';
import { AuthService } from 'src/app/data/services/auth.service';
import { MessageService } from 'src/app/data/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile$: Observable<IProfile>;
  messages$: Observable<IMessage[]>;
  isLoading:boolean = false;

  constructor(
    private _authService: AuthService,
    private _messagesService: MessageService,
    private _router:Router
  ){
    this.isLoading = false;
    this.profile$ = this._authService.getProfile();
    this.messages$ = this._messagesService.getMessages();
    
    this.messages$.subscribe((res) => {
      if (res) {
        this._scrollDownBox();
      } 
    });
  
  }

  ngOnInit(): void {}

  onUpdateProfile(data) {
    this._authService.updateProfile(data).subscribe((res) => {
      this.profile$ = this._authService.getProfile();
      this.messages$ = this._messagesService.getMessages();
    });
  }

  onRequestMessage(){
    this.isLoading = true;
    this._messagesService.requestMessages().subscribe((res) => {
      this.isLoading = false;
      this.messages$ = this._messagesService.getMessages();
    });
  }

  onClose(){
    localStorage.setItem('adviser.token', '');
    this._router.navigateByUrl('auth/login');
  }

  private _scrollDownBox() {
    setTimeout(() => {
      const objDiv = document.getElementById('box');
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 500);
  }

}
