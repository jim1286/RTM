import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 32px;
`;

type Props = {};

const FocusScreen: React.FC<Props> = () => {
  const {
    focusedTask: task,
    shuffleFocusedTask,
    updateTaskCompletion,
  } = useTaskStore();

  const handleMarkCompleted = () => {
    if (task) updateTaskCompletion(task.id, true);
  };

  return (
    <>
      {task ? (
        <Container>
          <Task>{task.label}</Task>
          <Button onClick={handleMarkCompleted}>mark completed</Button>
          <Spacer height={45} />
          <TextButton onClick={shuffleFocusedTask}>nope</TextButton>
        </Container>
      ) : (
        <div>Nothing</div>
      )}
    </>
  );
};

export default FocusScreen;
