import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

@NgModule({
  declarations: [
    AppointmentCalendarComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppointmentCalendarComponent, { injector: this.injector});

    customElements.define('appointment-calendar', el);
  }
}

