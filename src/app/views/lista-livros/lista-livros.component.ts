import {
  Livro,
  LivroInterface,
} from "./../../interfaces/lista-livros.interface";
import { LivroService } from "./../../services/livro.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: Livro[] = [];
  public campoBusca: string = "";
  private subscription: Subscription;

  constructor(private livroService: LivroService) {}

  public buscarLivros(): void {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (retornoApi) => this.converterDadosEmLivro(retornoApi),
      error: (erro) => console.error(erro),
      complete: () => console.log("Observable completado"),
    });
  }

  private converterDadosEmLivro(lista: LivroInterface[]): void {
    lista.forEach((item) => {
      this.listaLivros.push({
        title: item.volumeInfo.title,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
        authors: item.volumeInfo.authors,
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("ngOnDestroy");
  }
}
