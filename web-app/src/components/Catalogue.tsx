import type { Item } from "catalogue-type";
import { useState } from "preact/hooks";
import { ProgramFactory } from "program-factory";
import type { ReactiveCatalogue } from "reactive-catalogue-type";

const AddItemForm = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  const [id, setId] = useState(crypto.randomUUID());

  return (
    <form
      onReset={() => {
        setId(crypto.randomUUID());
      }}
      onSubmit={(e) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);

        const item: Item = {
          id,
          name: fd.get("name") as string,
        };

        catalogue.add(item);

        e.currentTarget.reset();
      }}
    >
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Item Form</h2>

          <div className="grid gap-0 mb-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">What is item name?</span>
              </div>
              <input
                name="name"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                autoComplete="off"
              />
            </label>
          </div>

          <div className="card-actions">
            <input class="btn btn-primary" type="submit" />
            <input class="btn" type="reset" />
          </div>
        </div>
      </div>
    </form>
  );
};

const CroppedUUID = ({ id }: { id: string }) => {
  return (
    <span> {id.length > 8 ? id.slice(0, 4) + "…" + id.slice(-5, -1) : id}</span>
  );
};

export const Items = ({ catalogue }: { catalogue: ReactiveCatalogue }) => {
  const renderedRows = catalogue.items().value.map((item) =>
    item.value ? (
      <tr key={item.value.id}>
        <th>
          <CroppedUUID id={item.value.id} />
        </th>
        <td>{item.value.name}</td>
      </tr>
    ) : null
  );

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export const Catalogue = () => {
  const program = ProgramFactory.get();

  return (
    <section className="grid grid-cols-4 gap-8 m-4">
      <h1 class="text-5xl col-span-4">Catalogue</h1>

      <div className="lg:col-span-2 md:col-span-2 col-span-4">
        <Items catalogue={program.catalogue} />
      </div>
      <div className="lg:col-span-2 md:col-span-2 col-span-4">
        <AddItemForm catalogue={program.catalogue} />
      </div>
    </section>
  );
};
