import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  previous: number = 0;
  next: number = 0;
  count: number = 0;
  pokemonsList: Pokemon[] = [];
  buttonActive: boolean = true;
  buttonActiveII: boolean = false;
  constructor(private pokemonServ: PokemonService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('value');

    this.pokemonServ.getPokemons().subscribe((resp) => {
      this.pokemonsList = resp;
      console.log(this.pokemonsList);
    });
  }

  ngAfterViewInit(): void {
    this.getPhotoUrl;
  }

  capitalize(pokemon: Pokemon) {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }

  getPhotoUrl(pokemon: Pokemon) {
    let id = pokemon.url.split('/').reverse()[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  onImgError(event: any){
    event.target.src = '../../../assets/img/pokeApi.png'
   }

  startPage() {
    this.previous = 0;
    this.pokemonServ
      .getPaginationPrevious(this.previous)
      .pipe(delay(300))
      .subscribe((resp) => {
        this.pokemonsList = resp;
        if (localStorage.getItem('value') === 'start') {
          this.buttonActive = true;
          this.buttonActiveII = false;
        }
      });
    this.onActivate();
  }

  previousPage() {
    this.previous = 20;
    this.pokemonServ
      .getPaginationPrevious(this.previous)
      .pipe(delay(300))
      .subscribe((resp) => {
        this.pokemonsList = resp;
        if (localStorage.getItem('value') === 'start') {
          this.buttonActive = true;
          this.buttonActiveII = false;
        } else if (localStorage.getItem('value') === 'final') {
          this.buttonActive = false;
          this.buttonActiveII = false;
        }
      });
    this.onActivate();
  }

  nextPage() {
    if (this.pokemonServ.params.offset == 1140){
      this.next = this.pokemonServ.params.offset;
      this.pokemonServ
      .getPaginationNext(this.next)
      .pipe(delay(300))
      .subscribe((resp) => {
        this.pokemonsList = resp;
        if (localStorage.getItem('value') === 'final') {
          this.buttonActive = false;
          this.buttonActiveII = true;
        }
      });
    }else {
      this.next = 20;
      this.pokemonServ
      .getPaginationNext(this.next)
      .pipe(delay(300))
      .subscribe((resp) => {
        this.pokemonsList = resp;
        if (localStorage.getItem('value') === 'final') {
          this.buttonActive = false;
          this.buttonActiveII = true;
        }
      });
    }
    this.buttonActive = false;
    this.onActivate();
  }

  FinalPage() {
    this.next = 1140;

    this.pokemonServ
      .getPaginationNext(this.next)
      .pipe(delay(300))
      .subscribe((resp) => {
        this.pokemonsList = resp;
        if (localStorage.getItem('value') === 'final') {
          this.buttonActive = false;
          this.buttonActiveII = true;
        }
      });
    this.onActivate();
  }

  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  pokemonDetails(name: string) {
    this.pokemonServ
      .getPokemonDetails(name)
      .subscribe((pokemon) => this.router.navigate(['/pokemon', pokemon.name]));
  }
}
