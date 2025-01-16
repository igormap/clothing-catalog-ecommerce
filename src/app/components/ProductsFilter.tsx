"use client";

import useDebounce from "@/hooks/useDebounce";
import { ListProductParams } from "@/services/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchBy, setSearchBy] = useState<string>(
    searchParams.get("searchBy") || ""
  );
  const debounceSearch = useDebounce(searchBy || "");

  useEffect(() => {
    router.push(`/?${new URLSearchParams({ searchBy: debounceSearch })}`, {
      scroll: false,
    });
  }, [debounceSearch]);

  return (
    <div className="w-full flex justify-center items-center gap-2 py-6 my-6">
      <label htmlFor="searchBy">
        Pesquisa
        <input
          placeholder="Pesquisa"
          name="searchBy"
          className="h-8 border border-gray-300 rounded-md px-2"
          type="text"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
      </label>
    </div>
  );
}
