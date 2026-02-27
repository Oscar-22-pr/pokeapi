import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Data } from './servicios/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokeapi');
  personajes: any[] = [];

  constructor(private data: Data) {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.data.obtenerPokemons().subscribe((data: any) => {
      this.personajes = data.results;
      console.log(this.personajes);
    });
  }
}
