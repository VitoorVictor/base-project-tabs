"use client";

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface CustomHeaderPageProps {
  placeholder: string;
  nameSearch: string;
}

export default function SearchBar({
  placeholder,
  nameSearch,
}: CustomHeaderPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const search = searchParams.get(nameSearch) || "";

  const onSubmit = (values: any) => {
    currentParams.set(nameSearch, values.search);
    router.push(`?${currentParams.toString()}`);
  };

  const form = useForm<any>({
    defaultValues: {
      search: search,
    },
  });

  const searchValue = form.watch("search");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="relative">
        <Input
          // type="search"
          placeholder={placeholder}
          className="w-full truncate rounded-md bg-background pr-10 pl-3"
          {...form.register("search")}
        />

        {searchValue && (
          <button
            type="button"
            onClick={() => {
              form.setValue("search", "");
              form.handleSubmit(onSubmit)();
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
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 rounded-l-none hover:bg-primary/10"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
// }
