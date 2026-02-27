import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Data {
  private urlbase = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {}

  obtenerPokemons(){
    return this.http.get<any>(this.urlbase);
  }
  getPokemonDetails(url: string) {
    return this.http.get(url);
  }
}
