import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  AiOutlineHome,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsCheck2, BsXLg } from "react-icons/bs";
import { FcInvite } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import { RxCardStackMinus } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Moment from "react-moment";

export default function index() {
  const [state, setState] = useState<boolean>(false);
  const [state2, setState2] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [newSpaceState, setNewSpaceState] = useState(false);
  const [name, setName] = useState<string>("");
  const [spaces, setSpaces] = useState([]);
  const [invites, setInvites] = useState([]);
  const [spaceName, setSpaceName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [inviteN, setInviteN] = useState<string>("");
  const [spaceN, setSpaceN] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token")!);
    }
  }, []);

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
        setInvites(data.data.invites),
        setInviteN(data.data.totalInvites),
        setSpaceN(data.data.totalSapces),
        setDay(data.data.day);
    },
  });

  if (!token) {
    return (
      <div>
        <Navbar />
        <Hero />
      </div>
    );
  }

  const newSpace = () => {
    axios.post(
      "http://localhost:3000/api/space/create",
      {
        spaceName,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    window.location.reload();
  };

  const AcceptInvite = (inviteId: string, spaceId: string) => {
    axios.post(
      "http://localhost:3000/api/user/invites",
      {
        acceptInvite: true,
        inviteId,
        spaceId,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    window.location.reload();
  };

  const RejectInvite = (inviteId: string, spaceId: string) => {
    axios.post(
      "http://localhost:3000/api/user/invites",
      {
        acceptInvite: false,
        inviteId,
        spaceId,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const goToSpace = (id: string) => {
    window.location.href = `http://localhost:3000/space/${id}`;
  };

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
      <div className="dark:bg-zinc-600 dark:text-white bg-white text-black flex overflow-hidden font-ibm">
        {!showSideBar ? (
          <div
            className="w-10 h-screen flex justify-center py-3 dark:bg-zinc-700 cursor-pointer font-ibm"
            onClick={() => setShowSideBar(true)}
          >
            <div className="flex justify-end">
              <RxHamburgerMenu size={20} />
            </div>
          </div>
        ) : (
          <div className="h-screen w-auto dark:bg-zinc-700 flex flex-col font-ibm">
            <div className="p-2 flex flex-col gap-4 text-md font-semibold">
              <div className="flex justify-end">
                <HiOutlineArrowLeft
                  size={20}
                  onClick={() => setShowSideBar(false)}
                />
              </div>

              <div className="flex gap-2 justify-center items-center">
                <h2 className="">Hi, {name}</h2>
              </div>

              <div className="flex gap-2 justify-center items-center cursor-auto">
                <Link href="/">Home</Link>
                <AiOutlineHome />
              </div>

              <div className="flex flex-col gap-2 justify-center items-center cursor-pointer">
                <div
                  className="flex gap-2 justify-center items-center"
                  onClick={state ? () => setState(false) : () => setState(true)}
                >
                  <p>Spaces</p>
                  <RxCardStackMinus />
                  {state ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </div>
                {state ? (
                  <div>
                    {spaces.map((space) => (
                      <div
                        className="text-xs flex"
                        key={space.id}
                        onClick={() => goToSpace(space.id)}
                      >
                        <p className="hidden">{space.id}</p>
                        <p>{space.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className="flex gap-2 justify-center items-center cursor-pointer"
                  onClick={
                    newSpaceState
                      ? () => setNewSpaceState(false)
                      : () => setNewSpaceState(true)
                  }
                >
                  <AiOutlinePlus />
                  {newSpaceState ? (
                    <form className="text-black" onSubmit={newSpace}>
                      <input
                        type="text"
                        placeholder="Space Name"
                        className="text-sm rounded-sm text-center"
                        onChange={(e) => setSpaceName(e.target.value)}
                      />
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center items-center cursor-pointer">
                <div
                  className="flex gap-2 justify-center items-center"
                  onClick={
                    state2 ? () => setState2(false) : () => setState2(true)
                  }
                >
                  <p>Invites</p>
                  <FcInvite />
                  {state2 ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </div>
                {state2 ? (
                  <div>
                    {invites.map((invite) => (
                      <div className="text-xs flex gap-3" key={invite.id}>
                        <p className="hidden">{invite.id}</p>
                        <p>{invite.spaceName}</p>
                        <p>|</p>
                        <p className="text-semibold">{invite.createdByUser}</p>
                        <div className="flex gap-2">
                          <BsCheck2
                            onClick={() =>
                              AcceptInvite(invite?.id, invite?.spaceId)!
                            }
                          />
                          <BsXLg
                            onClick={() =>
                              RejectInvite(invite?.id, invite?.spaceId)!
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className="flex gap-3 justify-center items-center cursor-pointer"
                onClick={logout}
              >
                Logout
                <BiLogOut />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 h-screen w-screen">
          <div className="flex justify-between relative p-2">
            <h1 className="text-xl font-medium">Hi {name}</h1>
            <Moment className="capitalize text-xl font-medium" format="ll">
              {day}
            </Moment>
          </div>
        </div>
      </div>
    </>
  );
}
