import { useState } from "react";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton, UserTag } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { Link } from "react-router-dom";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const itemClass = styles.item;
  const textContainerClass = styles.textContainer;

  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    // your code here
    setLoading(true);
    const updatedTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      isChecked: !task.isChecked,
      dateCreated: task.dateCreated,
    };

    const res = await updateTask(updatedTask);

    if (!res.success) {
      console.error(res.error);
      return setLoading(false);
    }

    setTask(res.data);
    setLoading(false);
  };

  let checkedstyle = textContainerClass;
  if (task.isChecked) {
    checkedstyle += ` ${styles.checked}`;
  }

  return (
    <div className={itemClass}>
      <CheckButton checked={task.isChecked} disabled={isLoading} onPress={handleToggleCheck} />
      <div className={checkedstyle}>
        <Link to={`/task/${task._id}`} className={styles.title}>
          {task.title}
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
      <UserTag user={task.assignee} />
    </div>
  );
}
