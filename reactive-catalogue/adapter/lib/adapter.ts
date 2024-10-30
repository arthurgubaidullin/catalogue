import { Signal, signal } from "@preact/signals";
import { Catalogue, Item } from "catalogue-type";
import { ReactiveCatalogue } from "reactive-catalogue-type";

export class ReactiveCatalogueAdapter implements ReactiveCatalogue {
  readonly #catalogue: Catalogue;
  readonly #items: Signal<ReadonlyArray<Signal<Item | null>>>;

  static get(catalogue: Catalogue) {
    return new ReactiveCatalogueAdapter(catalogue);
  }

  private constructor(catalogue: Catalogue) {
    this.#catalogue = catalogue;

    this.#items = signal(Array.from(this.iterator()));
  }

  items() {
    return this.#items;
  }

  private *iterator() {
    for (const getItem of this.#catalogue.items()) {
      const item = signal<Item | null>(null);

      getItem().then((data) => {
        item.value = data;
      });

      yield item;
    }
  }

  async add(item: Item) {
    this.#catalogue.add(item);

    this.#items.value = Array.from(this.iterator());
  }
}
