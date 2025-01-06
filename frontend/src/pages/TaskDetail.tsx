import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const taskId = useParams<{ id: string }>().id;
  const [isEditing, setisEditing] = useState<boolean>(false); // initially false

  useEffect(() => {
    if (!taskId) {
      return;
    }
    getTask(taskId).then((result) => {
      if (result.success) {
        setTask(result.data);
      } else {
        alert(result.error);
      }
    });
  }, [taskId]);

  return (
    <Page>
      <Helmet>
        <title>{task !== null ? task.title : ""} | TSE Todos</title>
      </Helmet>
      <p>
        <Link to="/">Back to home</Link>
      </p>
      {isEditing && task ? (
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={(updatedTask) => {
            setTask(updatedTask);
            setisEditing(false);
          }}
        />
      ) : task ? (
        <>
          <Button label="Edit Task" onClick={() => setisEditing(true)} />
          <span>{task.description || "(No description)"}</span>
          <div>
            <span>Assignee</span>
            <UserTag user={task.assignee} />
          </div>
          <div>
            <span>Status </span>
            <span>{task.isChecked ? "Done" : "Not Done"}</span>
          </div>
          <div>
            <span>Date created </span>
            <span>
              {Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(task.dateCreated)}
            </span>
          </div>
        </>
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>This task doesn't exist!</p>
      )}
    </Page>
  );
}
