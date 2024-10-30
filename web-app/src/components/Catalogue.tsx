import type { JSX } from "preact/jsx-runtime";
import { ProgramFactory } from "program-factory";
import type { ReactiveCatalogue } from "reactive-catalogue-type";

const AddItemForm = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const fd = new FormData(e.currentTarget);

          catalogue.add({ id: fd.get("id") as string });

          e.currentTarget.reset();
        }}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">What is item ID?</span>
          </div>
          <input
            name="id"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            required
          />

          <div className="label"></div>
        </label>

        <input class="btn" type="submit" />
      </form>
    </div>
  );
};

export const Items = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  const items = catalogue.items().value;

  const renderedItems: JSX.Element[] = [];

  for (const item of items) {
    renderedItems.push(<li key={item.id}>Item {item.id}</li>);
  }

  return (
    <div className="grid gap-4">
      <ul className="">{renderedItems}</ul>
    </div>
  );
};

export const Catalogue = () => {
  const program = ProgramFactory.get();

  return (
    <section class="grid gap-8 m-4">
      <h1 class="text-5xl">Catalogue</h1>

      <Items catalogue={program.catalogue} />
      <AddItemForm catalogue={program.catalogue} />
    </section>
  );
};
