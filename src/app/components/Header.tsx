import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between h-24 w-full bg-white py-4 px-8 font-medium">
      <h1 className="text-3xl font-bold">Catálogo</h1>
      <HeaderMenu>
        <HeaderMenuItem href="/" label="Home" />
        <HeaderMenuItem href="/shop" label="Shop" />
      </HeaderMenu>
      <HeaderMenu>
        <HeaderMenuItem href="#filtro" label={<Search />} />
        <HeaderMenuItem href="/carrinho" label={<ShoppingCart />} />
      </HeaderMenu>
    </header>
  );
}

function HeaderMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav>
      <ul className="flex gap-4">{children}</ul>
    </nav>
  );
}

function HeaderMenuItem({
  href,
  label,
}: {
  label: string | React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link href={href} className="cursor-pointer">
        {label}
      </Link>
    </li>
  );
}
