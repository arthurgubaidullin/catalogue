import { Catalogue, Item } from "catalogue-type";

export class FakeCatalogue implements Catalogue {
  readonly #items: Array<Item>;

  private constructor() {
    this.#items = [];
  }

  static get() {
    return new FakeCatalogue();
  }

  *items() {
    for (const item of this.#items) {
      yield () => Promise.resolve(item);
    }
  }

  async add(item: Item) {
    if (this.#items.find((_item) => _item.id === item.id)) {
      return;
    }

    this.#items.push(item);
  }
}
