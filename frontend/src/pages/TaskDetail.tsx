import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getTask } from "src/api/tasks";
import { Button, Page } from "src/components";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const taskId = useParams<{ id: string }>().id;

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
      {task === null ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>This task doesn't exist!</p>
      ) : (
        <>
          <Button label="Edit Task" />
          <span>{task.description ? task.description : "(No description)"}</span>
          <div>
            <span>Assignee</span>
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
      )}
    </Page>
  );
}
