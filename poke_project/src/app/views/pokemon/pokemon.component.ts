import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbilityResponse } from 'src/app/interfaces/pokemon-abilities.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemonName: string = '';
  pokemonImg: any = '';
  pokemonGif: any;
  pokemonWeight: any;
  pokemonHeight: any;
  description?: any;
  abilities: any = '';
  species?: AbilityResponse;
  typeName: any;

  constructor(
    private pokemonServ: PokemonService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { name } = this.activatedRoute.snapshot.params;
    this.pokemonServ.getPokemonDetails(name).subscribe((resp) => {
      this.pokemonImg = resp.sprites.other?.['official-artwork'].front_default;
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
              this.description = element.flavor_text.replace(/[\n\t\r]/g, ' ');
            }
            abilityresp.genera.forEach((element2) => {
              if (element2.language.name === 'es') {
                this.species = element2.genus;
              }
            });
          })
        );
    });
  }
  onImgError(event: any){
    event.target.src = '../../../assets/img/pokeApi.png'
   }
}
