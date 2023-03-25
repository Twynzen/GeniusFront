import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceButtonComponent } from './components/voice-button/voice-button.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WalkinLoaderComponent } from './components/animations/walkin-loader/walkin-loader.component';
import { ThinkingFigureComponent } from './components/animations/thinking-figure/thinking-figure.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceButtonComponent,
    ConversationComponent,
    WalkinLoaderComponent,
    ThinkingFigureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
