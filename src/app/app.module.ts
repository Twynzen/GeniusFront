import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceButtonComponent } from './components/voice-button/voice-button.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalkinLoaderComponent } from './components/animations/walkin-loader/walkin-loader.component';
import { ThinkingFigureComponent } from './components/animations/thinking-figure/thinking-figure.component';
import { SnakeComponent } from './components/snake/snake.component';
import { FilterResponsePipe } from './pipes/filter-response/filter-response.pipe';
import { VoicesComponent } from './components/voices/voices.component';
import { MultipleSpeakComponent } from './components/multiple-speak/multiple-speak.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { TwoBestOneComponent } from './components/two-best-one/two-best-one.component';
import { FormatResponsePipe } from './pipes/format-response.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VoiceButtonComponent,
    WalkinLoaderComponent,
    ThinkingFigureComponent,
    SnakeComponent,
    FilterResponsePipe,
    VoicesComponent,
    MultipleSpeakComponent,
    AlarmComponent,
    TwoBestOneComponent,
    FormatResponsePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [FilterResponsePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
