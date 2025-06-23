"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface CustomHeaderPageProps {
  placeholder: string;
  search: string;
  onSubmit: (search: string) => void;
}

type SearchForm = { search: string };

export default function SearchBar({
  placeholder,
  search,
  onSubmit,
}: CustomHeaderPageProps) {
  const form = useForm<SearchForm>({
    defaultValues: {
      search: search,
    },
  });
  const onSubmitForm = (values: SearchForm) => {
    onSubmit(values.search);
  };

  const searchValue = form.watch("search");

  return (
    <form onSubmit={form.handleSubmit(onSubmitForm)}>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="w-full truncate rounded-md bg-background pr-10 pl-3 h-8"
          {...form.register("search")}
        />

        {searchValue && (
          <button
            type="button"
            onClick={() => {
              form.setValue("search", "");
              form.handleSubmit(onSubmitForm)();
            }}
            className="cursor-pointer absolute right-14 top-1/2 -translate-y-1/2 flex items-center justify-center rounded p-2 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <Separator
          orientation="vertical"
          className="absolute right-[48px] top-1/2 -translate-y-1/2 h-4"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-8 rounded-l-none hover:bg-primary/10 cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
