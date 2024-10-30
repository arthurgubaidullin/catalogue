import { Item } from "./item.js";

export interface Catalogue {
  readonly items: () => Iterable<() => Promise<Item>, void, unknown>;
  readonly add: (item: Item) => Promise<void>;
}
