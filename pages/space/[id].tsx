import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
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
import { useRouter } from "next/router";

export default function space() {
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
  // const [task , setTask] = useState([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token")!);
    }
  }, []);

  const { isLoading: indexLoading , error: indexError } = useQuery({
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

  

  const router = useRouter()

  const {id} = router.query

  const {error: taskError , isLoading:taskLoading , data: taskData} = useQuery(["spaceData", id], () => {
    return axios.get(`http://localhost:3000/api/space/${id}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
  })

  console.log(taskData)

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

  if (indexLoading)
    return (
      <div className="dark:bg-zinc-950 dark:text-white bg-white text-black h-screen">
        Loading...
      </div>
    );

  if (indexError)
    return (
      <div className="dark:bg-zinc-950 dark:text-white bg-white text-black h-screen">
        {"An error has occurred: " + error.message}
      </div>
    );

  return (
    <>
      <div className="bg-indigo-200 flex overflow-hidden">
        {!showSideBar ? (
          <div
            className="w-10 h-screen flex justify-center py-3 bg-rose-300 cursor-pointer"
            onClick={() => setShowSideBar(true)}
          >
            <div className="flex justify-end">
              <RxHamburgerMenu size={20} />
            </div>
          </div>
        ) : (
          <div className="h-screen w-auto bg-rose-300 flex flex-col font-montserrat">
            <div className="p-2 flex flex-col gap-4 text-lg font-semibold">
              <div className="flex justify-end">
                <HiOutlineArrowLeft
                  size={20}
                  onClick={() => setShowSideBar(false)}
                />
              </div>

              <div className="flex gap-2 justify-center items-center">
                <h2 className="">Hi, {name} !</h2>
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
                      <div className="text-xs flex" key={space.id}>
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

        <div className="flex flex-col gap-4 h-screen p-3">
          <div className="flex gap-4 justify-first text-2xl relative left-full">
            <p>search</p>
            <p>sort</p>
            <p>filters</p>
          </div>

          <div className="flex flex-wrap gap-10 pt-3 pl-3 justify-center items-center">
            {
              taskData?.data.task.map((task:any) => (

            <div className="w-60 h-72 bg-purple-400 text-xs rounded-sm bg-opacity-40">
              <form>
               <p className="hidden">{task.id}</p> 
               <p>Title : {task.title}</p>
               <p>Created: {task.createdAt}</p>

                <p>{task.description}</p>

               <p>Priority : {task.priority}</p>
                <p>Status : {task.status}</p>
              </form>
            </div>

              ))
            }


            <AiOutlinePlus size={40} />
          </div>
        </div>
      </div>
    </>
  );
}
