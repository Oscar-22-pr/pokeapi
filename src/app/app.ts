import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Data } from './servicios/data';
import { forkJoin } from 'rxjs'; // Necesario para combinar peticiones

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('pokeapi');
  personajes: any[] = []; // Cambiamos a any para aceptar el objeto completo con sprites

  constructor(private data: Data) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.data.obtenerPokemons().subscribe({
      next: (response: any) => {
        // 1. Creamos un arreglo de peticiones (una por cada URL de pokemon)
        const detallesQueries = response.results.map((p: any) => 
          this.data.getPokemonDetails(p.url) 
        );

        // 2. Ejecutamos todas las peticiones al mismo tiempo
        forkJoin(detallesQueries).subscribe((fullDetails: any) => {
          this.personajes = fullDetails; 
          console.log('Datos con imágenes:', this.personajes);
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
