import { LivroService } from './../../services/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  public listaLivros: [];
  public campoBusca: string = '';

  constructor(private livroService: LivroService) { }

  public buscarLivros(): void {
    console.log(`CampoBusca: ${this.campoBusca}`);
    
    this.livroService.buscar(this.campoBusca).subscribe(
      retornoApi => console.log(retornoApi)
    )
  }
}
