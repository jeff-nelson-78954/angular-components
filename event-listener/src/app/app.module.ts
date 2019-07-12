import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EventListenerComponent } from './event-listener/event-listener.component';

@NgModule({
  declarations: [
    EventListenerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(EventListenerComponent, { injector: this.injector});

    customElements.define('event-listener', el);
  }
}
