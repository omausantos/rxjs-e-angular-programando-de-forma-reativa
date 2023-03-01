import { LivroInterface } from "./lista-livros.interface";

export class LivroModel {
  public title: string;
  public authors: string[];
  public publisher: string;
  public publishedDate: string;
  public description: string;
  public previewLink: string;
  public thumbnail: string;

  constructor(item: LivroInterface) {
    (this.title = item.volumeInfo.title),
      (this.publisher = item.volumeInfo.publisher),
      (this.publishedDate = item.volumeInfo.publishedDate),
      (this.description = item.volumeInfo.description),
      (this.previewLink = item.volumeInfo.previewLink),
      (this.thumbnail = item.volumeInfo.imageLinks.thumbnail),
      (this.authors = item.volumeInfo.authors);
  }
}
