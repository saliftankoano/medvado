import Image from "next/image";
import medvadoLogo from "../../public/medvado.png";
export default function NavBar() {
  return (
    <div className="navbar w-screen h-full bg-white flex justify-between shadow-md z-10">
      <div className="flex items-center pl-4">
        <Image src={medvadoLogo} alt="medvado logo" width="320" height="180" />
      </div>
      <div className="links text-black flex items-center pr-4">
        <a href="http://google.com">Account</a>
      </div>
    </div>
  );
}
