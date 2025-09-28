import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex-1 ">
      <div>
        <h1 className="text-5xl font-bold">Welcome Admin</h1>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
    </div>
  );
}
