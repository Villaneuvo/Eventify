import * as Form from "@radix-ui/react-form";
import "../globals.css";
import Image from "next/image";

const SearchBar = () => {
  return (
    <Form.Root className="flex w-full">
      <Form.Field className="FormField" name="email">
        <Form.Control asChild>
          <input
            className="Input ml-4 rounded-[1.875rem] border border-black border-opacity-25 bg-bg-main p-3 text-xs shadow-search-bar-shadow lg:w-52 xl:w-64"
            type="text"
            placeholder="Search Events"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="my-auto h-8 w-8 -translate-x-10 cursor-pointer rounded-[100%] bg-main-color shadow-search-bar-shadow">
          <div className="flex justify-center">
            <Image
              src="/magnifier-white-sm.png"
              alt="Logo"
              width={12}
              height={12}
            />
          </div>
        </button>
      </Form.Submit>
    </Form.Root>
  );
};

export { SearchBar };
