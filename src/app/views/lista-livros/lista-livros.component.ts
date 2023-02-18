import { LivroService } from './../../services/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  public listaLivros: [];
  public campoBusca: string = '';
  private subscription: Subscription;

  constructor(private livroService: LivroService) { }

  public buscarLivros(): void {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe(
      {
        next: retornoApi => console.log(retornoApi),
        error: erro => console.error(erro),
        complete: () => console.log('Observable completado'),
      }
    )
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('ngOnDestroy');
    
  }
}
