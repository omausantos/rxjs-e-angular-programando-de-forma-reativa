import { LivroInterface } from "./../../interfaces/lista-livros.interface";
import { LivroService } from "./../../services/livro.service";
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LivroModel } from "src/app/interfaces/livro.model";

@Component({
  selector: "app-lista-livros",
  templateUrl: "./lista-livros.component.html",
  styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: LivroModel[] = [];
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
    lista.map((item) => {
      this.listaLivros.push(new LivroModel(item));
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("ngOnDestroy");
  }
}
