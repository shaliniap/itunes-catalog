import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ItunesListComponent } from './itunes-list/itunes-list.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'itunes-list', component: ItunesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
