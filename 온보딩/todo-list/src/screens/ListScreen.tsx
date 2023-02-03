import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { nanoid } from "nanoid";

type Props = {};

type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      setTasks((tasks) => [
        ...tasks,
        { id: nanoid(), label: newTaskLabel, isComplete: false },
      ]);
      setNewTaskLabel("");
    }
  };

  const handleTaskCompleteChange =
    (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === handledTask.id)
            return { ...task, isComplete: e.target.checked };
          return task;
        })
      );
    };

  // function handleTaskCompleteChange(handledTask: Task) {
  //   return function (e: ChangeEvent<HTMLInputElement>) {
  //     setTasks((tasks) =>
  //       tasks.map((task) => {
  //         if (task.id === handledTask.id)
  //           return { ...task, isComplete: e.target.checked };
  //         return task;
  //       })
  //     );
  //   };
  // }

  const handleClearClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));
  };

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handledTask.id));
  };
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleTaskCompleteChange(task)}
            />{" "}
            {task.label}
            <button onClick={handleTaskDeleteClick(task)}>delete</button>
          </div>
        ))}
      </ul>
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <div>
        <button onClick={handleClearClick}>clear completed</button>
      </div>
    </>
  );
};

export default ListScreen;
