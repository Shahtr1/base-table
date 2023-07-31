import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AscSharedLibsModule} from "asc-shared-libs";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AscSharedLibsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
