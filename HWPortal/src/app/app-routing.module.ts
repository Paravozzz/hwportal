import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
  
import { CalcdoComponent } from './calcdo/calcdo.component';
import { CalcwallsComponent } from './calcwalls/calcwalls.component';
import { CreditsComponent } from './credits/credits.component';
import { LoginComponent } from './accounts/login/login.component';
import { RegisterComponent } from './accounts/register/register.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'news', component: NewsComponent },
  { path: 'products/calcdo', component: CalcdoComponent },
  { path: 'products/calcwalls', component: CalcwallsComponent },
  { path: 'accounts/login', component: LoginComponent },
  { path: 'accounts/register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'credits', component: CreditsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
