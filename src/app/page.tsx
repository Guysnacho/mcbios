import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert mx-auto"
          src="https://mcbios.com/images/logo.jpg"
          alt="Next.js logo"
          width={337}
          height={187}
          priority
        />
        <h6 className="mx-auto text-md text-center font-[family-name:var(--font-geist-mono)]">
          MCBIOS 2025 is{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            Under Construction
          </code>
          .
        </h6>
      </main>
    </div>
  );
}
