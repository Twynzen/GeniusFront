import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceButtonComponent } from './components/voice-button/voice-button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WalkinLoaderComponent } from './components/animations/walkin-loader/walkin-loader.component';
import { ThinkingFigureComponent } from './components/animations/thinking-figure/thinking-figure.component';
import { SnakeComponent } from './components/snake/snake.component';

@NgModule({
  declarations: [
    AppComponent,
    VoiceButtonComponent,
    WalkinLoaderComponent,
    ThinkingFigureComponent,
    SnakeComponent
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
