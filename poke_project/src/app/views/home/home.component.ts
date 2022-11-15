import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  previous: number = 0;
  next: number = 0;
  pokemonsList: Pokemon[] = [];
  buttonActive: boolean = true;
  constructor(private pokemonServ: PokemonService, private router: Router) { }
  
  ngOnInit(): void {
    localStorage.removeItem('value');
    
    this.pokemonServ.getPokemons().subscribe(resp => {
      this.pokemonsList = resp;
      console.log(this.pokemonsList);
    })
  }
  
  
  ngAfterViewInit(): void {
    this.getPhotoUrl;

  }


  capitalize(pokemon: Pokemon) {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }
  
  getPhotoUrl(pokemon: Pokemon) {
    let id = pokemon.url.split("/").reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  previousPage() {
    this.previous=20;
    this.pokemonServ.getPaginationPrevious(this.previous).pipe(delay(300)).subscribe(resp => {
      this.pokemonsList = resp;
      if(localStorage.getItem('value')==='stop'){
        this.buttonActive=true;
      }
    });
    
    this.onActivate();
  }

  nextPage() {
    this.next=20;
    
    this.pokemonServ.getPaginationNext(this.next).pipe(delay(300)).subscribe(resp => {
      this.pokemonsList = resp;  
    })
    
    localStorage.removeItem('value');
    this.buttonActive=false;
    
    this.onActivate();
  }

  onActivate() {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
  }


  pokemonDetails(name: string) {
    this.pokemonServ.getPokemonDetails(name).subscribe(pokemon => 
      this.router.navigate(['/pokemon', pokemon.name]));
  }

}

