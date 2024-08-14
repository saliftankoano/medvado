export default function CardsBoard() {
  return (
    <div className="container w-[80vh]">
      <div className="remain-uploads flex">
        <span className="text-2xl text-black">Uploads Left</span>
        <div className="progression">
          <span className="text-xl text-black">02/10 uploads</span>
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
