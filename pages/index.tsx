import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineHome,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineArrowLeft,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function index() {
  const [state, setState] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [newSpaceState, setNewSpaceState] = useState(false);
  const [name, setName] = useState<string>("");
  const [spaces, setSpaces] = useState([]);
  const [invites, setInvites] = useState([]);

  const { isLoading, error } = useQuery({
    queryKey: ["landingPageData"],
    queryFn: async () =>
      await axios.get("http://localhost:3000/api/", {
        headers: { Authorization: localStorage.getItem("token") },
      }),
    onSuccess: (data) => {
      setData(data.data),
        setName(data.data.name),
        setSpaces(data.data.spaces),
        setInvites(data.data.invites);
    },
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="dark:bg-zinc-950 dark:text-white bg-white text-black h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="dark:bg-zinc-950 dark:text-white bg-white text-black h-screen">
        {"An error has occurred: " + error.message}
      </div>
    );

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="bg-indigo-300 flex overflow-hidden">
          {!showSideBar ? (
            <div
              className="w-20 h-screen flex justify-center py-3 bg-rose-300"
              onClick={() => setShowSideBar(true)}
            >
              <div className="flex justify-end">
                <RxHamburgerMenu size={40} />
              </div>
            </div>
          ) : (
            <div className="h-screen w-72 bg-rose-300 flex flex-col font-montserrat">
              <div className="p-3 pl-6 flex flex-col gap-4 text-2xl font-semibold">
                <div className="flex justify-end">
                  <HiOutlineArrowLeft
                    size={40}
                    onClick={() => setShowSideBar(false)}
                  />
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <h2 className="">Hi, {name} !</h2>
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <Link href="/">Home</Link>
                  <AiOutlineHome />
                </div>

                <div className="flex flex-col gap-2 justify-center items-center">
                  <div
                    className="flex gap-2 justify-center items-center"
                    onClick={
                      state ? () => setState(false) : () => setState(true)
                    }
                  >
                    <p>Spaces</p>
                    {state ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </div>
                  {state ? (
                    <div>
                      {spaces.map((space) => (
                        <div className="text-sm flex" key={space.id}>
                          <p className="hidden">{space.id}</p>
                          <p>{space.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="flex gap-2 justify-center items-center"
                    onClick={
                      newSpaceState
                        ? () => setNewSpaceState(false)
                        : () => setNewSpaceState(true)
                    }
                  >
                    <AiOutlinePlus />
                    {newSpaceState ? (
                      <form className="text-black">
                        <input
                          type="text"
                          placeholder="Space Name"
                          className="text-sm rounded-sm text-center"
                        />
                      </form>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-center items-center">
                  <div
                    className="flex gap-2 justify-center items-center"
                    onClick={
                      state ? () => setState(false) : () => setState(true)
                    }
                  >
                    <p>Invites</p>
                    {state ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </div>
                  {state ? (
                    <div>
                      {invites.map((invite) => (
                        <div className="text-sm flex" key={invite.id}>
                          <p className="hidden">{invite.id}</p>
                          <p>{invite.spaceName} </p>
                          <p className="text-semibold">
                            From {invite.createdByUser}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 h-screen p-3">
            <div className="flex gap-4 justify-first text-2xl relative left-full">
              <p>search</p>
              <p>sort</p>
              <p>filters</p>
            </div>

            <div className="flex flex-wrap gap-10 pt-3 pl-3 justify-center items-center">
              <div className="w-60 h-72 bg-purple-400"></div>

              <div className="w-60 h-72 bg-purple-400"></div>

              <AiOutlinePlus size={40} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <Hero />
        </div>
      )}
    </>
  );
}
