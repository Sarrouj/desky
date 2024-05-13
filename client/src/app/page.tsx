import Header from "@/Components/layout/Header";
import Image from "next/image";
import HeroSVG from ".../public/hero.svg";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="py-5 px-20">
        <section className="mt-20">
          <div className="w-2/4">
            <h2>Growth Solution in Single Platform.</h2>
            <h1 className="text-6xl font-extrabold leading-tight">Desky, The First <br /> Platform <span className="text-orange-600">For Private </span><br /> Calls For Bids</h1>
            <p className="mt-5">Never at water me might. On formed merits hunted unable merely by mr whence or. Possession the unpleasing simplicity her uncommonly.</p>
          </div>
          <div className="w-2/4">
           <Image src={"/hero.svg"} alt={""} width={1000}  height={100}/>
          </div>
        </section>
      </main>
      <footer></footer> 
    </>
  );
}


