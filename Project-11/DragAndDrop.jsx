import React, { useEffect, useRef, useState } from "react";

const DragAndDrop = ({ data: initialData }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("tasks-data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialData;
  });

  const mainHeadings = Object.keys(data);

  const dragItem = useRef(); // Information about the source task
  const dragOverItem = useRef(); // Information about the destination heading and index

  // Function to start dragging
  function handleStartDrag(e, task, heading, idx) {
    e.target.style.opacity = 0.5; // Set opacity to 0.5 when dragging
    dragItem.current = { task, heading, idx };
    e.target.classList.add("dragging"); // Add class for active drag state
  }

  // Function to reset styles after dragging
  function handleDragEnd(e) {
    e.target.style.opacity = 1;
    e.target.classList.remove("dragging"); // Remove active drag class
  }

  // Function to track where the dragged item is over
  function handleDragEnter(e, idx, heading) {
    dragOverItem.current = { idx, heading };
  }

  // Prevent default to allow drop
  function handleDragOver(e) {
    e.preventDefault();
  }

  // Drop function to handle the movement of tasks
  function handleDrop() {
    const source = dragItem.current;
    const dest = dragOverItem.current;

    if (!source || !dest) return; // If no source or destination, do nothing

    setData((prevData) => {
      if (source.heading === dest.heading) {
        const list = [...prevData[source.heading]];
        const [removedItem] = list.splice(source.idx, 1);
        list.splice(dest.idx, 0, removedItem);
        return { ...prevData, [source.heading]: list };
      } else {
        const sourceList = [...prevData[source.heading]];
        const destList = [...prevData[dest.heading]];
        const [removedItem] = sourceList.splice(source.idx, 1);
        destList.splice(dest.idx, 0, removedItem);
        return { ...prevData, [source.heading]: sourceList, [dest.heading]: destList };
      }
    });

    dragItem.current = null;
    dragOverItem.current = null;
  }

  const styles = {
    root: {
      background: "linear-gradient(135deg, #667eea, #4ba251)",
      fontFamily: "'Poppins', sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
    container: {
      width: "30%",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "15px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease",
      margin: "10px",
    },
    heading: {
      textAlign: "center",
      color: "#fff",
      marginBottom: "12px",
    },
    tasksContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    task: {
      padding: "12px",
      marginTop: "12px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #43cea2, #185a9d)",
      color: "#fff",
      fontWeight: 500,
      textAlign: "center",
      cursor: "grab",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
      transition: "all 0.25s ease",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskTitle: {
      margin: 0,
      flex: 1,
      textAlign: "left",
    },
    dragging: {
      opacity: 0.5,
      transform: "scale(1.1) rotate(2deg)",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <div style={styles.root}>
      {mainHeadings.map((heading) => (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={styles.container}
          key={heading}
        >
          <p style={styles.heading}>{heading.replace("_", " ")}</p>
          <div style={styles.tasksContainer}>
            {data[heading].map((task, idx) => (
              <div
                onDragStart={(e) => handleStartDrag(e, task, heading, idx)}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, idx, heading)}
                draggable
                style={styles.task}
                key={task.id}
              >
                <p style={styles.taskTitle}>{task.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
