import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { AbilityResponse } from 'src/app/interfaces/pokemon-abilities.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  pokemonName: string = '';
  pokemonImg: any = '';
  pokemonGif: any;
  pokemonWeight: any;
  pokemonHeight: any;
  description?: any;
  abilities: any = '';
  species?: AbilityResponse;
  typeName: any;

  noResults = false;
  searchedTxt: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private pokemonServ: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.noResults = false;
      this.searchedTxt = params['text'];
      this.pokemonServ.getPokemonDetails(this.searchedTxt).subscribe({
        next: (resp) => {
          this.pokemonImg =
            resp.sprites.other?.['official-artwork'].front_default;
          this.pokemonGif =
            resp.sprites.versions?.['generation-v'][
              'black-white'
            ].animated?.front_default;
          this.pokemonName = resp.name;
          this.abilities = resp.species;
          this.pokemonHeight = (resp.height * 30.48).toFixed(2);
          this.pokemonWeight = (resp.weight * 0.453592).toFixed(2);
          this.typeName = resp.types.map((currType) => currType.type.name);

          this.pokemonServ
            .getAbilities(this.abilities.url)
            .subscribe((abilityresp: AbilityResponse) =>
              abilityresp.flavor_text_entries.forEach((element) => {
                if (element.language.name === 'es') {
                  this.description = element.flavor_text.replace(
                    /[\n\t\r]/g,
                    ' '
                  );
                }
                abilityresp.genera.forEach((element2) => {
                  if (element2.language.name === 'es') {
                    this.species = element2.genus;
                  }
                });
              })
            );
        },
        error: () => {
          debugger;
          this.noResults = true;
          this.router.navigate([PageNotFoundComponent]).then(() => {
            window.location.reload();
          });
        },
      });
    });
  }
  ngAfterViewInit(): void {
    if (this.noResults == true) {
      window.location.reload();
    }
  }
}
