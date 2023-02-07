import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";
import DeleteIcon from "../icons/DeleteIcon";
import IconButton from "../components/IconButton";
import { Task } from "../types";
import Checkbox from "../components/Checkbox";

const Container = styled.div`
  align-self: stretch;
  display: flex;
  flex: 0 1 460px;
  flex-direction: column;
`;

const List = styled.div`
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 45px 24px;
`;

const ListItem = styled.label`
  align-items: center;
  display: flex;
  padding: 4px 0;
  font-size: 18px;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;

  ${ListItem}:hover & {
    visibility: visible;
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  color: #fff;
  border: none;
  padding: 20px 24px;
`;

type Props = {};

const ListScreen: React.FC<Props> = () => {
  const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      addTask({ label: newTaskLabel });
      setNewTaskLabel("");
    }
  };

  function handleTaskCompleteChange(task: Task) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      updateTaskCompletion(task.id, e.target.checked);
    };
  }

  const handleClearClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));
  };

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== handledTask.id));
  };

  return (
    <Container>
      <List>
        <ul>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <Checkbox
                checked={task.isComplete}
                onChange={handleTaskCompleteChange(task)}
              />
              <Spacer width={10} />
              {task.label}
              <Spacer flex={1} />
              <DeleteButton onClick={handleTaskDeleteClick(task)}>
                <DeleteIcon />
              </DeleteButton>
            </ListItem>
          ))}
        </ul>
      </List>
      <Spacer height={30} />
      <Input
        placeholder="Add a task"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <Spacer height={45} />
      <TextButton onClick={handleClearClick}>clear completed</TextButton>
    </Container>
  );
};

export default ListScreen;
