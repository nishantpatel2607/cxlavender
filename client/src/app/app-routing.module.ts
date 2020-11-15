import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmplFormComponent } from './components/empl-form/empl-form.component';
import { EmplListComponent } from './components/empl-list/empl-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: EmplListComponent,
  },
  { path: 'new', component: EmplFormComponent },
  {path: ':id', component: EmplFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
