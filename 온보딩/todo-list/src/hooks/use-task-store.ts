import useLocalStorage from "./use-local-storage";
import { nanoid } from "nanoid";
import { Task } from "../types";
import { shuffle } from "lodash";
import TaskContext from "../contexts/task-store";
import { useContext, useEffect } from "react";

// 재사용을 위해 빼놓고 쓴다.
// Custom Hook의 역할

const useTaskStore = () => {
  // useSelector 같은 역할
  const [tasks, setTasks] = useContext(TaskContext);

  const [focusedTaskId, setFocusedTaskId] = useLocalStorage<string | undefined>(
    "focused",
    tasks.filter((task) => !task.isComplete)[0]?.id
  );

  const addTask = (task: Pick<Task, "label">) => {
    const id = nanoid();

    setTasks((tasks) => [
      ...tasks,
      { id: id, label: task.label, isComplete: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  useEffect(() => {
    if (focusedTask?.isComplete)
      setFocusedTaskId(tasks.filter((task) => !task.isComplete)[0]?.id);
  }, [tasks, focusedTask, setFocusedTaskId]);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id);
  };

  const api = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion,
  };

  return api;
};

export default useTaskStore;
