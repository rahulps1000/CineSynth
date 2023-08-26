"use client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Teko, Oswald } from "next/font/google";
// import Card from "./Card";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("./Card"));

const teko = Teko({ subsets: ["latin"], weight: "300" });
const oswald = Oswald({ subsets: ["latin"], weight: "300" });

import { cinemas, categories } from "./constants";
import Loader from "./Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [cinema, setCinemas] = useState(null);
  const [category, setCategories] = useState([]);
  const [specification, setSpecification] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const onClickCinema = (item) => {
    setCinemas(item);
  };
  const onClickCategory = (item) => {
    if (category.includes(item)) {
      setCategories((old) => old.filter((x) => x != item));
    } else {
      setCategories((old) => [...old, item]);
    }
  };

  function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  }

  const getRecomendations = async () => {
    setLoading(true);
    const url = `/api/getRecomendation`;
    const payload = {
      type: cinema,
      categories: category,
      specification: specification,
    };
    try {
      var response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(payload),
      });
      var data = await response.json();
      console.log(data);
      if (response.status == 200) setRecomendations(data);
      else throw "error";
    } catch (error) {
      console.log(error);
      setRecomendations([]);
      toast.error("Internal Server Error. Please try after some time.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCinemas("Both");
  }, []);
  return (
    <main className="absolute">
      <NavBar />
      <div className="relative">
        <div className="flex flex-row justify-center w-full h-screen items-center top-0 overflow-x-hidden">
          <div className="text-lg w-3/4 text-center sm:text-xl sm:w-1/2">
            <span className={teko.className + " text-3xl"}>Cine Synth </span>
            <span className={oswald.className + " text-gray-300"}>
              is an innovative film and series recommendation system powered by
              the advanced GPT (Generative Pre-training Transformer) technology.
              This system is designed to provide personalized recommendations
              for users, based on their individual preferences and viewing
              history. The GPT-powered algorithm utilizes natural language
              processing (NLP) and machine learning techniques to analyze large
              amounts of data related to movies and TV shows, including plot
              summaries, ratings, reviews, and user behavior.
            </span>
            <div className={teko.className + " my-5 flex gap-8 justify-center"}>
              <button
                href="#"
                className="text-xl bg-gray-200 px-3 py-2 text-black rounded-lg hover:bg-white"
                onClick={() => scrollToSection("recomendation")}
              >
                Get Recomendations
              </button>
              <a
                href="https://github.com/rahulps1000/CineSynth"
                className="text-xl px-3 py-2 rounded-lg border hover:bg-gray-400"
                target="_blank"
              >
                View Source Code
              </a>
            </div>
          </div>
        </div>
        <div
          id="recomendation"
          className={
            oswald.className +
            " min-h-screen w-full flex flex-col items-center text-xl pb-10"
          }
        >
          <hr className="border w-4/5 rounded"></hr>
          <h1 className="text-4xl my-5">Get Recomendations</h1>
          <div className="w-3/4 mb-10">
            <div className="font-white">
              What type of entertainment are you looking for?
            </div>
            <div className="flex gap-3 py-3 sm:gap-5">
              {cinemas.map((item, index) => (
                <div
                  key={index}
                  className={`text-lg border border-white px-2 py-1 rounded-lg hover:text-black inline-block cursor-pointer sm:px-4 sm:py-2 sm:text-xl ${
                    cinema == item ? "selected-btn" : "hover:bg-gray-600"
                  }`}
                  onClick={(e) => onClickCinema(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4 mb-10">
            <div className="font-white">
              Which categories do you want the show or movie to include? (Please
              select all that apply)
            </div>
            <div className="flex gap-3 py-3 flex-wrap sm:gap-5">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={`text-lg border border-white px-2 py-1 rounded-lg hover:text-black inline-block cursor-pointer sm:px-4 sm:py-2 sm:text-xl ${
                    category.includes(item)
                      ? "selected-btn"
                      : "hover:bg-gray-600"
                  }`}
                  onClick={(e) => onClickCategory(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/4 mb-10">
            <div className="font-white text-lg sm:text-xl">
              No matter how specific or particular they may be, feel free to add
              any additional specifications.
            </div>
            <textarea
              className="my-3 w-full h-40 bg-transparent border rounded-lg p-3 valid:text-black valid:bg-gray-200 valid:border-none"
              placeholder="e.g. Hero should die and is available on Netflix."
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="w-3/4">
            <button
              className="text-xl px-4 py-2 rounded-lg w-full cursor-pointer text-black bg-gray-200"
              onClick={(e) => getRecomendations()}
            >
              Generate Recomendation
            </button>
          </div>
          <div className="w-3/4 mt-10 h-50 grid place-items-center relative py-2">
            {recomendations && !loading ? (
              recomendations.map((item, index) => (
                <Card key={index} title={item} />
              ))
            ) : loading ? (
              <Loader />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Home;
