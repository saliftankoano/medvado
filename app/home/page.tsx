"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { FileInput, Label, Progress } from "flowbite-react";
import ReactiveButton from "reactive-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

// Define the type for a flashcard
interface FlashCard {
  concept: string;
  definition: string;
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<FileList | null>(null);
  const [showFile, setShowFile] = useState<Boolean>(false);
  const [showDropzone, setShowDropzone] = useState<Boolean>(true);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);

  const cardsColors = ["green-500", "cyan-500", "pink-500"];

  const [buttonState, setButtonState] = useState("idle");

  async function generateCards() {
    setButtonState("loading");
    const file = uploadedFile?.item(0);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      const uploadFile = await fetch(`/api/upload?filename=${file.name}`, {
        method: "PUT",
        body: formData,
      });
      const newBlob = (await uploadFile.json()) as PutBlobResult;
      // Get Blob URL & file name and Send to card generation API
      const fileUrl = newBlob.url;
      const fileName = newBlob.contentDisposition
        .split(";")[1]
        .split("=")[1]
        .replace(/"/g, "");
      formData.delete("file");
      formData.append("fileUrl", fileUrl);
      formData.append("fileName", fileName);

      const makeCards = await fetch("/api/cards", {
        method: "POST",
        body: formData,
      });
      const result = await makeCards.json();
      // console.log(result); // Verify data here
      // console.log(result.flashcards);
      setFlashCards(result.flashcards || []);
    }

    setTimeout(() => {
      setButtonState("success");
      setShowFile(false);
      setShowDropzone(false);
    }, 2100);
  }

  return (
    <div className="container w-screen p-0 m-0">
      <div className="h-[20vh]">
        <NavBar />
      </div>
      <div className="app-container flex w-screen h-[81vh] p-0 m-0">
        <div className="w-[15%] h-full bg-gray-100 shadow-md">
          <SideBar />
        </div>
        <div className="content-container w-full p-0">
          <div className="remain-uploads p-4 w-[30%] ml-[15%] pt-4">
            <span className="text-2xl text-black">Uploads Left</span>
            <div className="progression">
              <span className="text-xl text-black"> 2/10 uploads</span>
              <div className="progress-bar">
                <Progress color="red" progress={25} />
              </div>
            </div>
          </div>

          <div className="upload-zone w-full h-[70%] pt-4 ">
            {showDropzone && (
              <div className="flex w-[80%] mx-auto h-[70%] items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="shadow-md flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 flex justify-center items-center dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 flex justify-center items-center dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 flex justify-center items-center dark:text-gray-400">
                      TXT, DOCX, PDF (Only documents)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    className="hidden"
                    accept=".txt, .docx, .pdf"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setUploadedFile(files);
                        setShowFile(true);
                      }
                    }}
                  />
                </Label>
              </div>
            )}

            {showFile && (
              <div className="show-files mt-4 text-black text-2xl">
                Uploaded file: {uploadedFile?.item(0)?.name}
                <ReactiveButton
                  buttonState={buttonState}
                  onClick={generateCards}
                  animation={true}
                  color="green"
                  size="large"
                  idleText="Make cards"
                  loadingText="Generating..."
                  successText={
                    <>
                      <FontAwesomeIcon icon={faCheck} /> Success
                    </>
                  }
                  errorText="Oops 🫤"
                  disabled={false}
                />
              </div>
            )}
            {!showDropzone && flashCards && flashCards.length > 0 && (
              <div className="flex mx-auto w-[40%] h-[80%] items-center justify-center">
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className="w-full h-full mx-auto"
                >
                  {flashCards.map((card, index) => (
                    <SwiperSlide
                      key={card.concept + index} // Use a unique key
                      className={`bg-${
                        cardsColors[index % cardsColors.length]
                      } p-4 shadow-md rounded-md flex flex-col justify-center items-center`}
                    >
                      <h1 className="text-xl font-bold mb-4">{card.concept}</h1>
                      <p className="text-md">{card.definition}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
