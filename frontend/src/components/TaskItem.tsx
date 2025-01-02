// import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const itemClass = styles.item;
  const textContainerClass = styles.textContainer;
  //   const [isLoading, setLoading] = useState<boolean>(false);

  let checkedstyle = textContainerClass;
  if (task.isChecked) {
    checkedstyle += ` ${styles.checked}`;
  }

  return (
    <div className={itemClass}>
      {/* render CheckButton here */}
      <CheckButton
        checked={task.isChecked}
        // disabled={isLoading}
        // onPress="Save"
        // className={handleSubmit}
      />
      <div className={checkedstyle}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
