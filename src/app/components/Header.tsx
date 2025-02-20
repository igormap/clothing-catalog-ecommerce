import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { HeaderMenu, HeaderMenuItem } from "./HeaderItemIcon";

export function Header() {
  return (
    <header className="flex items-center justify-between h-24 w-full bg-zinc-100 py-4 px-8 font-medium">
      <Link href={"/"}>
        <h1 className="text-3xl font-bold hover:text-amber-800">Ecommerce</h1>
      </Link>
      <HeaderMenu>
        <HeaderMenuItem href="/carrinho" label={<ShoppingCart />} inCart />
      </HeaderMenu>
    </header>
  );
}
