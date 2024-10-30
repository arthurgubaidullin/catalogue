import { Signal } from "@preact/signals";
import { Item } from "catalogue-type";

export interface ReactiveCatalogue {
  readonly items: () => Signal<Iterable<Item, void, unknown>>;
  readonly add: (item: Item) => void;
}
