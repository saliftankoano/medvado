import { Heart, Layers3 } from "lucide-react";
import Link from "next/link";
export default function SideBar() {
  return (
    <div className="options flex flex-col h-full ">
      <Link href="/cards" className="flex w-full justify-center">
        <Layers3 height={35} width={35} strokeWidth={0.75} />
        <div className="text-black text-2xl" style={{ marginLeft: "8px" }}>
          Cards
        </div>
      </Link>

      <Link
        href="/saved"
        className="option saved-cards w-full flex justify-center pt-4"
      >
        <Heart height={35} width={35} strokeWidth={0.75} />
        <div
          className="text-black text-2xl flex items-center"
          style={{ marginLeft: "8px" }}
        >
          Saved
        </div>
      </Link>
    </div>
  );
}
