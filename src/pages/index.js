import Image from "next/image";
import { Inter } from "next/font/google";
import Board from "@/components/Board/Board";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const itemsFromBackend = [
  { id: "item1", content: "First task" },
  { id: "item2", content: "Second task" },
  { id: "item3", content: "Third task" },
  { id: "item4", content: "Fourth task" },
  { id: "item5", content: "Fifth task" },
  { id: "item6", content: "Sixth task" },
  { id: "item7", content: "Seventh task" },
  { id: "item8", content: "Eigth task" },
];

const columnsFromBackend = {
  col1: {
    name: "Requested",
    items: itemsFromBackend,
  },
  col2: {
    name: "To do",
    items: [],
  },
  col3: {
    name: "In Progress",
    items: [],
  },
  col4: {
    name: "Done",
    items: [],
  },
};

// When the item is done dragging and falls on a new column

export default function Home() {
  return (
    <div className={`flex ${inter.className}`}>
      <Sidebar />
      <main className=" flex-1 mx-auto bg-white">
        <Navbar />
        <Board />
      </main>
    </div>
  );
}
