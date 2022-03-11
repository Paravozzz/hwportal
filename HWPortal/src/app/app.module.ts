import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
import { CalcdoComponent } from './calcdo/calcdo.component';
import { CalcwallsComponent } from './calcwalls/calcwalls.component';
import { AboutComponent } from './about/about.component';
import { CreditsComponent } from './credits/credits.component';
import { ComptitleComponent } from './comptitle/comptitle.component';
import { IdtabComponent } from './calcdo/idtab/idtab.component';
import { LoadstabComponent } from './calcdo/loadstab/loadstab.component';
import { ConstrtabComponent } from './calcdo/constrtab/constrtab.component';
import { LayersTableComponent } from './calcdo/constrtab/layers-table/layers-table.component';
import { LayersControlsComponent } from './calcdo/constrtab/layers-controls/layers-controls.component';
import { PavementVarComponent } from './calcdo/constrtab/pavement-var/pavement-var.component';
import { DataElementDirective } from './_directives/dataElement.directive';
import { RegisterComponent } from './accounts/register/register.component';
import { LoginComponent } from './accounts/login/login.component';
import { routerLinkActiveDropdownDirective } from './_directives/routerLinkActiveDropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    CalcdoComponent,
    CalcwallsComponent,
    AboutComponent,
    CreditsComponent,
    ComptitleComponent,
    IdtabComponent,
    LoadstabComponent,
    ConstrtabComponent,
    LayersTableComponent,
    LayersControlsComponent,
    PavementVarComponent,
    DataElementDirective,
    RegisterComponent,
    LoginComponent,
    routerLinkActiveDropdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
