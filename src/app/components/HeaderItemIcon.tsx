"use client";

import { useCartStore } from "@/providers/counter-store-provider";
import Link from "next/link";

export function HeaderMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav>
      <ul className="flex gap-4">{children}</ul>
    </nav>
  );
}

export function HeaderMenuItem({
  href,
  label,
  inCart,
}: {
  label: string | React.ReactNode;
  href: string;
  inCart?: boolean;
}) {
  const { totalItems } = useCartStore((store) => store);
  return (
    <li>
      <Link href={href} className="cursor-pointer relative">
        {label}
      </Link>
      {totalItems > 0 && inCart && (
        <div className="absolute rounded-full bg-red-400 w-5 h-5 top-4 right-4 text-white flex items-center justify-center">
          {totalItems}
        </div>
      )}
    </li>
  );
}
