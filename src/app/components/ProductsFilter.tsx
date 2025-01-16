"use client";

import useDebounce from "@/hooks/useDebounce";
import { ListProductParams } from "@/services/api";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import classNames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchBy, setSearchBy] = useState<string>(
    searchParams.get("searchBy") || ""
  );
  const debounceSearch = useDebounce(searchBy || "");

  const categories = useMemo(() => ["Calças", "Camisetas", "Tênis"], []);

  const updateSearchParams = useCallback(
    (params: ListProductParams) => {
      const currentParams = new URLSearchParams(window.location.search);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });
      router.push(`/?${currentParams.toString()}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    updateSearchParams({ searchBy: debounceSearch });
  }, [debounceSearch, router, updateSearchParams]);

  return (
    <div className="w-full flex justify-center items-center gap-2 py-6 my-6">
      <label htmlFor="searchBy" className="flex flex-col gap-2">
        Pesquisa
        <input
          placeholder="Pesquise por produto"
          name="searchBy"
          className="border border-gray-300 rounded-md px-2  h-[35px]"
          type="text"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
      </label>
      <label htmlFor="category" className="flex flex-col gap-2">
        Categoria
        <Select.Root
          onValueChange={(category) => updateSearchParams({ category })}
        >
          <Select.Trigger
            className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
            aria-label="Categoria"
          >
            <Select.Value placeholder="Selecione" />
            <Select.Icon className="text-violet11">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
              <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-[5px]">
                <Select.Group>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </Select.Group>
                <Select.Separator className="m-[5px] h-px bg-violet6" />
              </Select.Viewport>
              <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </label>
    </div>
  );
}

type SelectItemProps = React.PropsWithChildren<{
  className?: string; // Define que className é opcional
  value: string;
}>;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classNames(
          "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
