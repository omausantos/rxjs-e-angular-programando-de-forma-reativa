import { LivroInterface } from "./../../interfaces/lista-livros.interface";
import { LivroService } from "./../../services/livro.service";
import { Component, OnDestroy } from "@angular/core";
import { map, Subscription, switchMap, tap } from "rxjs";
import { LivroModel } from "src/app/interfaces/livro.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl();

  constructor(private livroService: LivroService) {}

  public livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((listaItens) => this.converterDadosEmLivro(listaItens)),
  );

  private converterDadosEmLivro(lista: LivroInterface[]): LivroModel[] {
    return lista.map((item) => {
      return new LivroModel(item);
    });
  }
}
