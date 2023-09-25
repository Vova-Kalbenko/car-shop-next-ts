import { Combobox, Transition } from "@headlessui/react";
import { SearchManuFacturerProps } from "@/types";
import { useState, Fragment } from "react";
import { manufacturers } from "@/constans";
import Image from "next/image";
const SearchManufacture = ({manufacturer, setManuFacturer}: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");
  const fitlteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .trim()
            .includes(query.toLowerCase().replace(/\s+/g, "").trim())
        );
  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="BMW"
            displayValue={(manufacture: string) => manufacture}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {
            //   fitlteredManufacturers.length === 0 && query !== "" ? (
            //     <Combobox.Option
            //       value={query}
            //       className="search-manufacturer__option"
            //     >
            //       Create "{query}"
            //     </Combobox.Option>
            //   ) : (
                fitlteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-grey-900"
                      }`
                    }
                  >
                    {({selected, active})=>{ 
                        return <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                          </span>
                        ) : null}
                        </>
                    }}
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacture;
