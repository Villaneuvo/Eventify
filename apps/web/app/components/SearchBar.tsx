import * as Form from "@radix-ui/react-form";
import "../globals.css";
import Image from "next/image";

const SearchBar = () => {
    return (
        <Form.Root className="w-full flex">
            <Form.Field className="FormField" name="email">
                <Form.Control asChild>
                    <input
                        className="Input bg-bg-main p-3 w-64 text-xs rounded-[1.875rem] border border-black border-opacity-25 shadow-search-bar-shadow"
                        type="text"
                        placeholder="Search Events"
                    />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="bg-main-color rounded-[100%] w-8 h-8 shadow-search-bar-shadow -translate-x-10 my-auto">
                    <div className="flex justify-center">
                        <Image src="/magnifier-white-sm.png" alt="Logo" width={12} height={12} />
                    </div>
                </button>
            </Form.Submit>
        </Form.Root>
    );
};

export { SearchBar };
