import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreen";
import TaskContext from "./contexts/task-store";
import useLocalStorage from "./hooks/use-local-storage";
import { Task } from "./types";
import styled from "styled-components";
import { colors } from "./styles";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 35px;
`;

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 62px;
  width: 120px;

  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
    background: ${colors.primary};
    color: black;
  }
`;

function App() {
  // localStorage 로 task[] 보내는 모듈
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    // Provider -> redux Store 처럼 전역으로 뿌려주는 역할
    <TaskContext.Provider value={[tasks, setTasks]}>
      <Layout>
        <Nav>
          <TabButton
            to="/"
            className={({ isActive }) => {
              if (isActive) return "active";
            }}
          >
            List
          </TabButton>
          <TabButton
            to="/focus"
            className={({ isActive }) => {
              if (isActive) return "active";
            }}
          >
            Focus
          </TabButton>
        </Nav>
        <Routes>
          <Route path="/" element={<ListScreen />} />
          <Route path="/focus" element={<FocusScreen />} />
        </Routes>
      </Layout>
    </TaskContext.Provider>
  );
}

export default App;
