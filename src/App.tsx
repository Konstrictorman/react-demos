import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TimerIcon from "@mui/icons-material/Timer";
import { useState } from "react";
import "./App.css";
import LeftBar from "./components/LeftBar/LeftBar";
import CreditCard from "./tasks/creditCard/CreditCard";

const TASKS = [
  { id: "music-player", name: "Music Player", icon: MusicNoteIcon },
  { id: "time-bomb", name: "Time Bomb", icon: TimerIcon },
  { id: "timer", name: "Timer", icon: AccessTimeIcon },
  { id: "virtual-list", name: "Virtual List", icon: ListAltIcon },
  { id: "credit-card", name: "Credit Card", icon: CreditCardIcon },
];

function App() {
  const [selectedTask, setSelectedTask] = useState<string | undefined>(
    undefined,
  );

  const getTaskComponent = (taskId: string) => {
    switch (taskId) {
      case "credit-card":
        return <CreditCard />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <h1>React Demos</h1>
      </header>

      <div className="main-layout">
        <LeftBar
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          tasks={TASKS}
        />
        <main className="content">
          {selectedTask ? (
            <div className="task-container">
              {getTaskComponent(selectedTask)}
            </div>
          ) : (
            <div className="welcome">
              <h2>Welcome to React Demos</h2>
              <p>Select a task from the left menu to get started.</p>
            </div>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2026 React Demos. @KonstrictorMan All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
