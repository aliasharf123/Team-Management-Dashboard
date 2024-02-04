import { getUrlFromString } from "@/lib/utlits";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Editor } from "@tiptap/core";
import { Check, Trash } from "lucide-react";
import {
  FC,
  FormEvent,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaLink } from "react-icons/fa6";
interface LinkSelectorProps {
  editor: Editor;
}

export default function LinkSelector({ editor }: LinkSelectorProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget[0] as HTMLInputElement;
    const url = getUrlFromString(input.value);
    url && editor.chain().focus().setLink({ href: url }).run();
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button endContent={<FaLink size={15} />} className="relative bg-white">
          Link
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              className="outline-none m-2"
              placeholder="Enter your url "
              defaultValue={editor.getAttributes("link").href || ""}
            />
          </form>
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100">
              <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
