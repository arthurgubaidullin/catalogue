import { Catalogue, Item } from "catalogue-type";

export class FakeCatalogue implements Catalogue {
  readonly #items: Array<Item>;

  private constructor() {
    this.#items = [{ id: "01" }, { id: "02" }, { id: "03" }, { id: "04" }];
  }

  static get() {
    return new FakeCatalogue();
  }

  *items() {
    for (const item of this.#items) {
      yield item;
    }
  }

  add(item: Item) {
    if (this.#items.find((_item) => _item.id === item.id)) {
      return;
    }

    this.#items.push(item);
  }
}
