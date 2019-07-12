import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2, OnDestroy  } from '@angular/core';

import { faCheckCircle, faSadTear } from '@fortawesome/free-solid-svg-icons';
import 'zone.js';

declare var $: any;

@Component({
  selector: 'app-event-listener',
  templateUrl: './event-listener.component.html',
  styleUrls: ['./event-listener.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EventListenerComponent implements OnInit, OnDestroy {
  @ViewChild('eventAddedMessage', {static: true}) messageAddedDiv: ElementRef;
  events: any[] = [];
  showingMessage = false;
  faCheck = faCheckCircle;
  faSad = faSadTear;
  stopListening: any;

  constructor(private renderer: Renderer2) {
    this.stopListening = renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  ngOnInit() {
  }

  displayEventAddedMessage() {
    if (!this.showingMessage) {
      this.showingMessage = true;
      $(this.messageAddedDiv.nativeElement).fadeIn('fast');
      setTimeout(() => {
        $(this.messageAddedDiv.nativeElement).fadeOut('slow');
        this.showingMessage = false;
      }, 1000);
    }
  }

  addEvent(source: string, event: string) {
    this.displayEventAddedMessage();
    if (this.events.length === 5) {
      this.events.shift();
    }
    this.events = this.events.concat({ source, event });
  }

  handleMessage(event: any) {
    if (event && event.origin && event.data) {
      this.addEvent(event.origin, JSON.stringify(event.data));
    }
  }

  ngOnDestroy() {
    this.stopListening();
  }
}
