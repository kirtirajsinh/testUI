import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/router";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useRouter();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          height: "auto",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          height: "100vh",
          transition: {
            damping: 40,
          },
        },
      };

  return (
    <div className="sticky top-0 z-[100] h-[100%]">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed"
      >
        <div className="flex items-center justify-between gap-2.5 font-medium border-b h-[5rem] border-[#DBDBDB]">
          <div
            className={`flex items-center mx-5 gap-2.5 ${
              open ? "block" : "hidden"
            }`}
          >
            <img
              src={"/svg/colorfilter.svg"}
              width={24}
              height={24}
              alt="logo"
            />
            <span className="whitespace-pre font-inter font-semibold text-[20px] leading-6 text-[#0D062D]">
              Project M.
            </span>
          </div>

          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={
              open
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    x: 10,
                    y: 0,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="w-fit h-fit  z-50  right-2 bottom-3 cursor-pointer"
          >
            <RxDoubleArrowLeft
              className="text-[#787486] text-[18px] cursor-pointer mr-3"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </motion.div>
        </div>

        <div className="flex flex-col">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col space-y-5 overflow-x-hidden">
            <li>
              <div
                href={"/home"}
                className="link font-inter text-base leading-5 flex  items-center gap-8"
              >
                <img src={"/svg/home.svg"} w="24px" h="24px" alt="home" />
                <p>Home</p>
              </div>
            </li>
            <li>
              <div
                href={"/message"}
                className="link font-inter text-base leading-5 flex  items-center gap-8"
              >
                <img src={"/svg/message.png"} w="24px" h="24px" alt="home" />
                Messages
              </div>
            </li>
            <li>
              <div
                href={"/task"}
                className="link font-inter text-base leading-5 flex  items-center gap-8"
              >
                <img src={"/svg/task.png"} w="24px" h="24px" alt="home" />
                Tasks
              </div>
            </li>
            <li>
              <div
                href={"/members"}
                className="link font-inter text-base leading-5 flex  items-center gap-8"
              >
                <img src={"/svg/members.png"} w="24px" h="24px" alt="home" />
                Members
              </div>
              <li className="mt-4">
                <div
                  href={"/setting"}
                  className="link font-inter text-base leading-5 flex  items-center gap-8"
                >
                  <img src={"/svg/setting.png"} w="24px" h="24px" alt="home" />
                  Setting
                </div>
              </li>
            </li>
            {(open || isTabletMid) && (
              <div className=" py-5 border-t border-[#DBDBDB]">
                <div className="flex items-center justify-between mr-2">
                  <small className="uppercase pl-3 text-slate-500 inline-block mb-2 font-bold text-[12px]">
                    my projects
                  </small>
                  <img
                    src={"/svg/addsquare.svg"}
                    w="24px"
                    h="24px"
                    alt="home"
                  />
                </div>
                <div className="flex flex-col">
                  <ul className="whitespace-pre  py-5 flex flex-col font-medium">
                    <div
                      className="w-full mb-1 py-3 px-2 flex flex-row items-center gap-5 justify-between rounded-md"
                      style={{
                        backgroundColor: "rgba(80, 48, 229, 0.08)",
                      }}
                    >
                      <span className="w-full flex flex-row items-center gap-5">
                        <p className="bg-[#7AC555] rounded-full w-[8px] h-[8px]"></p>
                        <p className="text-[16px]"> Mobile App</p>
                      </span>
                      <BsThreeDots className="text-[#0D062D] text-[16px] font-extrabold	" />
                    </div>
                    <div className="w-full mb-1 py-3 px-2 flex flex-row  items-center gap-5 ">
                      <p className="bg-[#FFA500] rounded-full w-[8px] h-[8px]"></p>
                      <p className="text-[16px]"> Website Redesign</p>
                    </div>
                    <div className="w-full mb-1 py-3 px-2 flex flex-row  items-center gap-5 ">
                      <p className="bg-[#E4CCFD] rounded-full w-[8px] h-[8px]"></p>
                      <p className="text-[16px]"> Design System</p>
                    </div>
                    <div className="w-full mb-1 py-3 px-2 flex flex-row  items-center gap-5 ">
                      <p className="bg-[#76A5EA] rounded-full w-[8px] h-[8px]"></p>
                      <p className="text-[16px]"> Wireframes</p>
                    </div>
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </div>

        {(open || isTabletMid) && (
          <div className="w-[85%]  relative m-auto mb-2 p-5 mt-6 rounded-lg bg-[#F5F5F5] flex flex-col items-center gap-3">
            <div className="w-full absolute top-[-1.5rem] flex justify-center mb-[-rem]">
              <span className="bg-gradient-to-b from-pink-200 to-[#F5F5F5] p-4 rounded-full ">
                <img src={"/svg/lamp.svg"} alt="lamp" />
              </span>
            </div>
            <p className="font-medium	text-[14px] mt-6">Thoughts Time</p>
            <p className="mb-3 text-[12px] text-[#787486] text-center font-normal">
              We don’t have any notice for you, till then you can share your
              thoughts with your peers.
            </p>
            <p>
              <input
                type="text"
                placeholder="Write a message"
                className="text-black w-[100%] m-auto text-center font-medium text-[14px] bottom-0 outline-0 border-white	rounded	"
              />
            </p>
          </div>
        )}
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
