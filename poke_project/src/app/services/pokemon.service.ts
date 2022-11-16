import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon, PokemonResponse } from '../interfaces/pokemon.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, of } from 'rxjs';
import { PokemonDetailsReponse } from '../interfaces/pokemon-details.interface';
import { AbilityResponse } from '../interfaces/pokemon-abilities.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private limitPage = 20;
  public offsetPage = 0;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      limit: this.limitPage,
      offset: this.offsetPage,
    };
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonResponse>(`${environment.api_base_url}/pokemon/`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        catchError((error) => of([]))
      );
  }

  getPokemonDetails(name: string): Observable<PokemonDetailsReponse> {
    return this.http.get<PokemonDetailsReponse>(
      `${environment.api_base_url}/pokemon/${name}`
    );
  }

  getAbilities(url: string): Observable<AbilityResponse> {
    return this.http.get<AbilityResponse>(`${url}`);
  }

  getPaginationPrevious(previous: number) {
    this.offsetPage -= previous;
    if (this.offsetPage === 0) {
      localStorage.setItem('value', 'stop');
    }
    return this.http
      .get<PokemonResponse>(
        `${environment.api_base_url}/pokemon/?limit=20&offset=${this.offsetPage}`
      )
      .pipe(
        map((resp) => resp.results),
        catchError((error) => of([]))
      );
  }

  getPaginationNext(next: number) {
    this.offsetPage += next;
    return this.http
      .get<PokemonResponse>(
        `${environment.api_base_url}/pokemon/?limit=20&offset=${this.offsetPage}`
      )
      .pipe(
        map((resp) => resp.results),
        catchError((error) => of([]))
      );
  }
}
