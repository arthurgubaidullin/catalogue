import { Signal } from "@preact/signals";
import { Item } from "catalogue-type";

export interface ReactiveCatalogue {
  readonly items: () => Signal<ReadonlyArray<Signal<Item | null>>>;
  readonly add: (item: Item) => Promise<void>;
}
