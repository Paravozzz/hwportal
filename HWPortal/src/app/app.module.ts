import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { NewsComponent } from './news/news.component';
import { CalcdoComponent } from './calcdo/calcdo.component';
import { CalcwallsComponent } from './calcwalls/calcwalls.component';
import { AboutComponent } from './about/about.component';
import { CreditsComponent } from './credits/credits.component';
import { ComptitleComponent } from './comptitle/comptitle.component';
import { IdtabComponent } from './calcdo/idtab/idtab.component';
import { LoadstabComponent } from './calcdo/loadstab/loadstab.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LandingComponent,
    NewsComponent,
    CalcdoComponent,
    CalcwallsComponent,
    AboutComponent,
    CreditsComponent,
    ComptitleComponent,
    IdtabComponent,
    LoadstabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
