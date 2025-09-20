import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoginDashboardComponent } from './core/login-dashboard/login-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', component: IndexComponent },
  {path: 'index', component:IndexComponent },
  { path: 'header', component:HeaderComponent },
  {path: 'footer', component:FooterComponent },
  {path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'services', component: ServicesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LoginDashboardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
