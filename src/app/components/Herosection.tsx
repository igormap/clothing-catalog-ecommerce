import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center flex-col">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bem vindo a nossa loja
        </h1>
        <p className="text-lg text-white">
          Compre produtos de qualidade com confiança
        </p>
      </div>
    </div>
  );
}
