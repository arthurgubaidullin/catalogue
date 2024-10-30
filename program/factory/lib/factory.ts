import { FakeCatalogue } from "catalogue-fake";
import { ReactiveCatalogueAdapter } from "reactive-catalogue-adapter";
import { Program } from "./program.js";

export class ProgramFactory {
  static #program: Program | null = null;

  static get(): Program {
    if (this.#program === null) {
      const catalogue = FakeCatalogue.get();

      const reactiveCatalogue = ReactiveCatalogueAdapter.get(catalogue);

      this.#program = new Program(reactiveCatalogue);
    }

    return this.#program;
  }

  private constructor() {}
}
