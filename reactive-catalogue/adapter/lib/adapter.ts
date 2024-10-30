import { Catalogue, Item } from "catalogue-type";
import { ReactiveCatalogue } from "reactive-catalogue-type";
import { Signal, signal } from "@preact/signals";

export class ReactiveCatalogueAdapter implements ReactiveCatalogue {
  readonly #catalogue: Catalogue;
  readonly #items: Signal<Iterable<Item, void, unknown>>;

  static get(catalogue: Catalogue) {
    return new ReactiveCatalogueAdapter(catalogue);
  }

  private constructor(catalogue: Catalogue) {
    this.#catalogue = catalogue;
    this.#items = signal(catalogue.items());
  }

  items() {
    return this.#items;
  }

  add(item: Item) {
    this.#catalogue.add(item);

    this.#items.value = this.#catalogue.items();
  }
}
