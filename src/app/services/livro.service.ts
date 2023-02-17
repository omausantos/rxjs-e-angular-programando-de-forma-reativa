import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LivroService {
  private readonly domainName = "https://www.googleapis.com/";
  constructor(private httpClient: HttpClient) {}

  public buscar(termoBusca: string): Observable<ListaLivros> {
    const params = new HttpParams().append('q', termoBusca);
    return this.httpClient.get<ListaLivros>(`${this.domainName}books/v1/volumes`, { params });
  }
}

interface ListaLivros {
  kind: string,
  totalItems: number,
  items: Array<Livro>,
}

interface Livro {
  kind: string,
  id: string,
  etag: string,
  selfLInk: string,
  volumeInfo: {
    title: string,
    subtitle: string,
    publisher: string,
    publishedDate: string,
    description: string,
    pageCount: number,
    printType: string,
    maturityRating: string,
    allowAnonLogging: boolean,
    contentVersion: string,
    language: string,
    previewLink: string,
    infoLink: string,
    canonicalVolumeLink: string,
    readingModes: {
      text: boolean,
      image: boolean,
    },
    panelizationSummary: {
      containsEpubBubbles: boolean,
      containsImageBubbles: boolean,
    },
    imageLinks: {
      smallThumbnail: string,
      thumbnail: string,
    },
    authors: Array<string>,
    categories: Array<string>,
    industryIdentifiers: Array<any>,
  },
  saleInfo: {
    country: string,
    saleability: string,
    isEbook: boolean,
  },
  accessInfo: {
    country: string,
    viewability: string,
    embeddable: boolean,
    publicDomain: boolean,
    textToSpeechPermission: string,
    webReaderLink: string,
    accessViewStatus: string,
    quoteSharingAllowed: boolean,
    epub: {
      isAvailable: boolean,
    },
    pdf: {
      isAvailable: boolean,
      acsTokenLink: string,
    },
  },
  searchInfo: {
    textSnippet: string,
  },
}


