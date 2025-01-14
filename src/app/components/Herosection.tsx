import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bem vindo a nossa loja
        </h1>
        <p className="text-lg text-white mb-8">
          Compre produtos de qualidade com confiança
        </p>
        <Link
          href="#"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
