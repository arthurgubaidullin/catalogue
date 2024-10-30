import type { JSX } from "preact/jsx-runtime";
import { ProgramFactory } from "program-factory";
import type { ReactiveCatalogue } from "reactive-catalogue-type";

const AddItemForm = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        catalogue.add({ id: fd.get("id") as string });

        e.currentTarget.reset();
      }}
    >
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Item Form</h2>

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

          <div className="card-actions">
            <input class="btn btn-primary" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};

export const Items = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  const items = catalogue.items().value;

  const renderedItems: JSX.Element[] = [];
  let i = 1;

  for (const item of items) {
    renderedItems.push(
      <tr key={item.id}>
        <th>{i++}</th>
        <td>Cy Ganderton</td>
      </tr>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{renderedItems}</tbody>
      </table>
    </div>
  );
};

export const Catalogue = () => {
  const program = ProgramFactory.get();

  return (
    <section className="grid grid-cols-4 gap-8 m-4">
      <h1 class="text-5xl col-span-4">Catalogue</h1>

      <div className="lg:col-span-3 md:col-span-2 col-span-4">
        <Items catalogue={program.catalogue} />
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4">
        <AddItemForm catalogue={program.catalogue} />
      </div>
    </section>
  );
};
