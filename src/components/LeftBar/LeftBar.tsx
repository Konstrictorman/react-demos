import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, IconButton } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import "../../App.css";
import styles from "./LeftBar.module.css";

type LeftBarProps = {
  selectedTask?: string;
  setSelectedTask: (task: string) => void;
  tasks: { id: string; name: string; icon: React.ElementType }[];
};

const LeftBar = ({ selectedTask, setSelectedTask, tasks }: LeftBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        styles.leftBar,
        collapsed ? styles.leftBarCollapsed : styles.uncollapsed,
      )}
    >
      <IconButton
        sx={{ marginBottom: "12px" }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </IconButton>
      <nav className={styles.nav}>
        {tasks.map((task) =>
          collapsed ? (
            <IconButton
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              color="primary"
            >
              <task.icon />
            </IconButton>
          ) : (
            <Button
              key={task.id}
              variant="outlined"
              className={clsx(selectedTask === task.id && styles.active)}
              endIcon={<task.icon />}
              onClick={() => setSelectedTask(task.id)}
              sx={{ justifyContent: "space-between" }}
            >
              {task.name}
            </Button>
          ),
        )}
      </nav>
    </aside>
  );
};

export default LeftBar;
