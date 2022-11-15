import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { PokemonComponent } from './views/pokemon/pokemon.component';
import { SearchComponent } from './views/search/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pokemon/:name', component: PokemonComponent },
  { path: 'search/:text', component: SearchComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent},

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', pathMatch: 'full', redirectTo: 'pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
