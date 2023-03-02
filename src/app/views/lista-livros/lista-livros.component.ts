import { LivroInterface } from "./../../interfaces/lista-livros.interface";
import { LivroService } from "./../../services/livro.service";
import { Component } from "@angular/core";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  switchMap,
} from "rxjs";
import { LivroModel } from "src/app/interfaces/livro.model";
import { FormControl } from "@angular/forms";

const TEMPOENTRECHAMADAS: number = 300;
@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
  public campoBusca = new FormControl();
  public mensagemDeErro = '';

  constructor(private livroService: LivroService) {}

  public livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    filter((valorDigitado) => this.minimoTextoParaPesquisa(valorDigitado)),
    debounceTime(TEMPOENTRECHAMADAS),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((listaItens) => this.converterDadosEmLivro(listaItens)),
    catchError(() => {
      this.mensagemDeErro = "Erro ao realizar buscar, recarregar a página!";
      return EMPTY;
    })
  );

  private minimoTextoParaPesquisa(valor: string): boolean {
    return valor.length >= 3;
  }

  private converterDadosEmLivro(lista: LivroInterface[]): LivroModel[] {
    return lista.map((item) => {
      return new LivroModel(item);
    });
  }
}
