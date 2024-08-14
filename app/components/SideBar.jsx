import Image from "next/image";
import cards from "../../public/cards.png";
import saved from "../../public/saved.png";

import Link from "next/link";
export default function SideBar() {
  return (
    <>
      <div className="navbar w-[20vw] bg-gray-100 bg-opacity-65 flex">
        <div className="options w-full mt-4">
          <Link href="/home">
            <div className="option flash-cards flex flex-row justify-center">
              <Image src={cards} width={"48"} height={"48"} />
              <span className="text-black text-2xl flex items-center">
                Flash Cards
              </span>
            </div>
            <div className="option saved-cards flex flex-row justify-center">
              <Image src={saved} width={"48"} height={"48"} />
              <span className="text-black text-2xl flex items-center">
                Flash Cards
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
