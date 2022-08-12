import React from "react";
import { ListGroup, Button } from "react-bootstrap";

interface TaskProps {
  _id: string;
  title: string;
  completed: boolean;
  onDelete: () => void;
  onCompleted: () => void;
}

const Task = ({ title, _id, completed, onDelete, onCompleted }: TaskProps) => {
  return (
    <ListGroup.Item
      key={_id}
      className={`${
        completed ? "completed" : ""
      } list-group-item d-flex justify-content-between task align-items-center`}
      onDoubleClick={() => onCompleted(_id)}
    >
      <span className={completed ? "strike" : ""}>{title}</span>

      <Button variant="danger" size="sm" onClick={() => onDelete(_id)}>
        DEL
      </Button>
    </ListGroup.Item>
  );
};

export default Task;
