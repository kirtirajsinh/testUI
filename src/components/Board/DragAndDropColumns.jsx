import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDropColumns = () => {
  const [columns, setColumns] = useState({
    column1: {
      id: "column1",
      title: "Column 1",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    column2: {
      id: "column2",
      title: "Column 2",
      items: [],
    },
    column3: {
      id: "column3",
      title: "Column 3",
      items: [],
    },
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the item is dropped outside a droppable area
    if (!destination) return;

    // Check if the item is dropped in a different column
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      //   const [removed] = sourceItems.splice(source.index, 1);
      //   destinationItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [column.id]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.values(columns).map((column, columnIndex) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <div
                className={`w-1/3 bg-gray-200 rounded p-4 ${
                  snapshot.isDraggingOver ? "bg-gray-300" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-semibold">{column.title}</h2>
                {column.items.map((item, index) => (
                  <Draggable
                    draggableId={`${column.id}-${item}`}
                    index={index}
                    key={`${column.id}-${item}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`bg-white rounded p-2 my-2 ${
                          snapshot.isDragging ? "bg-gray-100" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className="cursor-move"
                          {...provided.dragHandleProps}
                        >
                          Drag Handle
                        </div>
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDropColumns;
