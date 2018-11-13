import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperTableExampleComponent } from './components/super-table-example/super-table-example.component';

const routes: Routes = [
  { path: 'super-table', component: SuperTableExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SuperTableRoutingModule {}
