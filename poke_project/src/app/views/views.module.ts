import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';

import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    HomeComponent,
    PokemonComponent,
    SearchComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ]
})
export class ViewsModule { }
