"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { FileInput, Label, Progress } from "flowbite-react";
import ReactiveButton from "reactive-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<FileList | null>(null);
  const [showFile, setShowFile] = useState<Boolean>(false);
  const [showDropzone, setShowDropzone] = useState<Boolean>(true);
  const [showCards, setShowCards] = useState<Boolean>(false);

  const [buttonState, setButtonState] = useState("idle");
  async function generateCards() {
    setButtonState("loading");
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

          <div className="upload-zone w-[70%] h-[70%] mx-auto pt-4 ">
            {showDropzone && (
              <div className="flex w-full h-[70%] items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="shadow-md flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <FileInput
                    id="dropzone-file"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        console.log(files);
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
                Uploaded file: {uploadedFile?.item(0)?.name}{" "}
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
            {showDropzone == false && (
              <div className="flex w-full h-[70%] items-center justify-center bg-green-400">
                {" "}
                Cards go here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
