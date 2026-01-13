import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { PublicationComponent } from './publication/publication.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component'; // ✅ add this



const routes: Routes = [
  {
    path: 'create',
    component: MemberFormComponent
  },
  {
    path: 'member',
    component: MemberComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'publications',
    component: PublicationComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: ':id/edit',
    component: MemberFormComponent
  },
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login' // redirection pour les routes inconnues
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
