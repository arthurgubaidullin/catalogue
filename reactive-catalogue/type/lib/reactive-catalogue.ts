import { Signal } from "@preact/signals";
import { Item } from "catalogue-type";

export interface ReactiveCatalogue {
  readonly items: () => Signal<Iterable<Signal<Item | null>, void, unknown>>;
  readonly add: (item: Item) => Promise<void>;
}
