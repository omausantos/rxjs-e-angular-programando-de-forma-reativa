import { ListaLivrosInterface } from './../interfaces/lista-livros.interface';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LivroService {
  private readonly domainName = "https://www.googleapis.com/";
  constructor(private httpClient: HttpClient) {}

  public buscar(termoBusca: string): Observable<ListaLivrosInterface> {
    const params = new HttpParams().append('q', termoBusca);
    return this.httpClient.get<ListaLivrosInterface>(`${this.domainName}books/v1/volumes`, { params });
  }
}


