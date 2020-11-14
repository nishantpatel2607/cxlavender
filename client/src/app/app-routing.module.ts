import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmplListComponent } from './components/empl-list/empl-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmplListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
