// Board.js
import BoardData from "@/utils/Data";
import { useEffect, useState } from "react";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Board = () => {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    // Save the updated task order to localStorage
    localStorage.setItem("boardData", JSON.stringify(boardData));
  }, [boardData]);

  useEffect(() => {
    // Retrieve the task order from localStorage
    const savedBoardData = localStorage.getItem("boardData");
    if (savedBoardData) {
      setBoardData(JSON.parse(savedBoardData));
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  return (
    <div className="p-2 flex flex-col lg:h-[110vh] md:mx-8 bg-white">
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
            {boardData.map((board, bIndex) => (
              <div key={board.id}>
                <Droppable droppableId={bIndex.toString()}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <div
                        className={`bg-[#F5F5F5] rounded-t-lg shadow-md md:h-[105vh] h-auto
                        flex flex-col relative overflow-hidden pb-3 px-2 
                        ${snapshot.isDraggingOver && "bg-green-100"}`}
                      >
                        <div className=" px-3 mt-5 flex gap-2 items-center justify-between">
                          <span className="flex gap-2 items-center">
                            <p
                              className={`${
                                board.name === "To Do"
                                  ? "bg-[#5030E5]"
                                  : board.name === "On Progress"
                                  ? "bg-[#FFA500]"
                                  : "bg-[#76A5EA]"
                              } rounded-full w-[8px] h-[8px]`}
                            ></p>
                            <span className="font-medium text-base leading-5 text-indigo-900">
                              {board.name}
                            </span>
                            <span className="bg-[#E0E0E0] text-center text-[#625F6D] rounded-full h-[20px] w-[20px] font-medium	text-[12px]">
                              {board.items.length}
                            </span>
                          </span>
                          {board.name === "To Do" ? (
                            <img src={"svg/addsquare1.svg"} alt="attach" />
                          ) : null}
                        </div>
                        <p
                          className={`${
                            board.name === "To Do"
                              ? "bg-[#5030E5]"
                              : board.name === "On Progress"
                              ? "bg-[#FFA500]"
                              : "bg-[#76A5EA]"
                          } h-[2px]  rounded-full my-2  `}
                        ></p>
                        <div>
                          {board.items.length > 0 &&
                            board.items.map((item, iIndex) => (
                              <Task
                                key={item.id}
                                data={item}
                                index={iIndex}
                                className="m-3"
                              />
                            ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
