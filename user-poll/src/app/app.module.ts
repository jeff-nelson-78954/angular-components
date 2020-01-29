import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { UserPollComponent } from './user-poll/user-poll.component';

@NgModule({
  declarations: [
    UserPollComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [UserPollComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(UserPollComponent, { injector: this.injector});

    customElements.define('user-poll', el);
  }
}
