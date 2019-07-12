import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'zone.js';


@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppointmentCalendarComponent implements OnInit, OnDestroy {
  @Input() calendarName: string;
  @Output() eventAdded = new EventEmitter<any>();
  @ViewChild('calendar', {static: true}) calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin];
  events: any [] = [];
  stopListening: any;

  eventForm = new FormGroup ({
    eventTitle: new FormControl('', Validators.required),
    eventDate: new FormControl('', Validators.required)
  });

  constructor(private renderer: Renderer2) {
    this.stopListening = renderer.listen('window', 'message', this.handleMessage.bind(this));
  }

  ngOnInit() {
    this.generateDummyEvents();
  }

  onAddEvent() {
    this.addEvent(this.eventForm.get('eventTitle').value, this.eventForm.get('eventDate').value);
    this.eventForm.get('eventTitle').setValue('');
    this.eventForm.get('eventDate').setValue('');
  }

  handleMessage(event: any) {
    const data = event.data;
    if (data.type === 'appointment-calendar-add-event') {
      this.addEvent(data.data.title, data.data.date);
    } else if (data.type === 'appointment-calendar-set-events') {
      this.events = [];
      data.data.forEach((ev: { title: string; date: string; }) => {
        this.addEvent(ev.title, ev.date);
      });
    }
  }

  ngOnDestroy() {
    this.stopListening();
  }

  generateDummyEvents() {
    for (let i = 0; i < 10; i++) { // get the next 10 days
      const today = new Date();
      today.setDate(today.getDate() + i);

      let month = '' + (today.getMonth() + 1);
      let day = '' + today.getDate();
      const year = '' + today.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      this.events.push({ title: `Event ${i}`, date: [year, month, day].join('-') });
    }
  }

  private addEvent(title: string, date: string) {
    this.events = this.events.concat( { title, date } );
    this.eventAdded.emit({ title , date });
  }
}
