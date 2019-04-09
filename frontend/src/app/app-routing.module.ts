import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrapeComponent } from './scrape/scrape.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scrape',
    pathMatch: 'full'
  },
  {
    path: 'scrape',
    component: ScrapeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
