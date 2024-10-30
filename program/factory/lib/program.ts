import { ReactiveCatalogue } from "reactive-catalogue-type";

export class Program {
  public readonly catalogue: ReactiveCatalogue;

  constructor(catalogue: ReactiveCatalogue) {
    this.catalogue = catalogue;
  }
}
