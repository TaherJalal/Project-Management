import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div className="dark:bg-zinc-900 dark:text-white text-black bg-emerald-700 flex flex-col font-montserrat">
      <div className="flex w-screen px-20  justify-center gap-5 py-32 dark:bg-gray-900 bg-lime-400 bg-fixed">
        <div className="flex flex-col justify-center gap-3 w-2/4">
          <h3 className="text-5xl">Lorem ipsum.</h3>
          <p className="text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            architecto eos suscipit modi explicabo quod aliquid reprehenderit,
            et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius
            omnis. Doloribus.
          </p>
        </div>
        <Image
          src="/Ilustrations/Illustration 1.png"
          height={600}
          width={600}
          alt=""
        />
      </div>

      <div className="flex w-screen px-20 justify-center gap-5 py-32 dark:bg-gray-800 bg-lime-300 bg-fixed">
        <Image
          src="/Ilustrations/Illustration 2.png"
          height={800}
          width={800}
          alt=""
        />
        <div className="flex flex-col justify-center gap-3 w-2/4">
          <h3 className="text-5xl">Lorem ipsum.</h3>
          <p className="text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            architecto eos suscipit modi explicabo quod aliquid reprehenderit,
            et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius
            omnis. Doloribus.
          </p>
        </div>
      </div>

      <div className="flex w-screen px-20 justify-center gap-5 py-32 dark:bg-sky-800 bg-lime-200 bg-fixed">
        <div className="flex flex-col justify-center gap-3 w-2/4">
          <h3 className="text-5xl">Lorem ipsum.</h3>
          <p className="text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            architecto eos suscipit modi explicabo quod aliquid reprehenderit,
            et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius
            omnis. Doloribus.
          </p>
        </div>
        <Image
          src="/Ilustrations/Illustration 3.png"
          height={800}
          width={800}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
