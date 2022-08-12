import React, { useState } from "react";
import {
  Container,
  ListGroup,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useTracker } from "meteor/react-meteor-data";

import Header from "./Header";
import Task from "./Task";
import tasks from "../api/tasks";

export const App = () => {
  const [newTask, setNewTask] = useState("");

  const dbTask = useTracker(() =>
    tasks.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!newTask) {
      return alert("Please enter a new task");
    }

    tasks.insert({ createdAt: new Date(), title: newTask.trim() });
    setNewTask("");
  };

  const onDelete = (_id: string) => {
    tasks.remove(_id);
  };

  const onCompleted = (id: string) => {
    const { _id, completed } = tasks.findOne({ _id: id });

    tasks.update(_id, {
      $set: {
        completed: !completed,
      },
    });
  };

  return (
    <Container>
      <div className="container d-flex justify-content-flex-end flex-column">
        <Header />

        <div className="note-wrapper mt-3">
          <ListGroup className="list-group">
            {dbTask.map(({ title, _id, completed }, key) => {
              return (
                <div {...{ key }}>
                  <Task {...{ title, _id, completed, onDelete, onCompleted }} />
                </div>
              );
            })}
          </ListGroup>
        </div>
        <div className="input-wrapper">
          <Form onSubmit={handleSubmit}>
            <InputGroup.Text className="mt-3">
              <FormControl
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task"
                value={newTask}
              />

              <Button type="submit">Submit</Button>
            </InputGroup.Text>
          </Form>
        </div>
      </div>
    </Container>
  );
};
