import { Item } from "./item.js";

export interface Catalogue {
  readonly items: () => Iterable<Item, void, unknown>;
  readonly add: (item: Item) => void;
}
