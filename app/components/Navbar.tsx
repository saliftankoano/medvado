import Image from "next/image";
import medvadoLogo from "../../public/medvado.png";
export default function NavBar() {
  return (
    <>
      <div className="navbar w-screen h-[15vh] bg-white flex justify-between">
        <div className="flex items-center">
          <Image src={medvadoLogo} alt="medvado logo" width="170" height="60" />
        </div>
        <div className="links text-black flex items-center pr-2">
          <a href="http://google.com">Account</a>
        </div>
      </div>
    </>
  );
}
