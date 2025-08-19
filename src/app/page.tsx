import Image from "next/image";
import { ProductCategoryGrid } from "@/components/product/product-category-grid";

export default function Home() {
  return (
    <main className="flex flex-col gap-7 items-center container mx-auto space-y-5 font-poppins">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover h-auto w-full "
        alt="banner"
        src="https://www.dropbox.com/scl/fi/15vgne07d7pi5x7osudg8/banner-1.jpeg?rlkey=nbqvdu2kiu5zce8iwu164q16y&st=206cqz6i&raw=1"
        priority
      />

      <ProductCategoryGrid
        title="lo mas nuevo"
        query={{ sort_by: "created_descending" }}
      />
      <h2 className="text-3xl  uppercase font-semibold text-orange-400">
        las marcas con que trabajamos
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-evenly justify-items-center px-5 gap-3">
        {marcas.map((marca, i) => (
          <Image
            key={i}
            width={100}
            height={100}
            className="object-contain"
            alt="banner"
            src={marca}
          />
        ))}
      </div>

      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover h-auto w-full "
        alt="banner"
        src="https://www.dropbox.com/scl/fi/tl71rg23ql6sd2h3xhly6/banner-2.jpeg?rlkey=7j7ixkd51ysd8mdckj1xqtx5h&st=kjovdihq&raw=1"
        priority
      />
    </main>
  );
}

const marcas = [
  "https://www.dropbox.com/scl/fi/kuut97qlikgbv2hiny4zz/adidass-150x150.png?rlkey=znic8u9t39niw82qv4vep2ql3&st=sqxofmea&raw=1",
  "https://www.dropbox.com/scl/fi/3jv3irfrdfrzze586uazw/nike-120-z-70.png?rlkey=5lkhqpv6rc0izdhjyckoro9yt&st=clcm5nt0&raw=1",
  "https://www.dropbox.com/scl/fi/7zjl8srrlhcgj8w37q5fv/vans-150x150.png?rlkey=3g50dn3vixv7s5l2vfuz0w4j3&st=678d5de8&raw=1",
  "https://www.dropbox.com/scl/fi/9j7dnn3tnd49oo1jtczkk/6-150x150.png?rlkey=lgzzfdjgp41ew5euxnr97aff3&st=0231uh6l&raw=1",
  "https://www.dropbox.com/scl/fi/3bl52tai95anym2erhufb/converse2-150x150.png?rlkey=h58lswc4rvlzaux60xzh9bvgg&st=ul04r6zx&raw=1",
  "https://www.dropbox.com/scl/fi/o67vffv91p14zn3zlttu8/LACOSTE-150x150.png?rlkey=jimcpl6uckh985429n27qm13b&st=r4wjwbxt&raw=1",
];
