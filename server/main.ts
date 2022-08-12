import { Meteor } from "meteor/meteor";
import tasks from "/imports/api/tasks";

Meteor.startup(() => {
  if (tasks.find().count() === 0) {
    tasks.insert({
      _id: "1",
      title: "First task",
      createdAt: new Date(),
    });
  }
});
