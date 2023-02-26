import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceButtonComponent } from './components/voice-button/voice-button.component';
import { ConversationComponent } from './components/conversation/conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceButtonComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
