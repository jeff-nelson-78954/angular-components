import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-poll',
  templateUrl: './user-poll.component.html',
  styleUrls: ['./user-poll.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserPollComponent implements OnInit, OnDestroy {
  @Input() userName = 'Test User';
  @Output() userVoted = new EventEmitter<string>();
  vote: string;
  hasVoted = false;
  stopListening: any;

  // the render will listen to messages posted to the window
  constructor(private renderer: Renderer2) {
    this.stopListening = renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  ngOnInit() {
  }

  onVote(val: string) {
    this.hasVoted = true;
    this.vote = val;
    this.userVoted.emit(this.vote);
  }

  onGoBack() {
    this.hasVoted = false;
    this.vote = undefined;
  }

  handleMessage(event: any) {
    const data = event.data;
    if (data.type === 'user-poll-vote') {
      this.onVote(data.data);
    }
  }

  ngOnDestroy() {
    this.stopListening();
  }

}
