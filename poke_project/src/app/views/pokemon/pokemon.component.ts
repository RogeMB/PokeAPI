import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemonName: string = '';
  pokemonImg: any = '';
  description: any = '';


  constructor(private pokemonServ: PokemonService, private activatedRoute: ActivatedRoute) { 
    const {name} = this.activatedRoute.snapshot.params;

    this.pokemonServ.getPokemonDetails(name).subscribe(resp => {
      this.pokemonImg = resp.sprites.other?.['official-artwork'].front_default;
      this.pokemonName = resp.name;
      }); 
  }


  ngOnInit(): void {
  }

}
