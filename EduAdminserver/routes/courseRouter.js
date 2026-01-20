import { Router } from "express";
import { getAll } from "../models/CourseModel";
import { purchaseCourse, getEnrolledCourses } from "../models/PurchaseModel";
const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
  const data = await getAll();
  res.send(data);
});

// student can purchase course

courseRouter.post("/purchase/:courseId", async (req, res) => {
  const { _id } = res.locals.user;
  const { courseId } = req.params;
  const data = await purchaseCourse(_id, courseId);
  res.send({
    message: `Course with id: ${courseId} purchased successfully!!!`,
    data: data,
  });
});

courseRouter.get("/enrolledCourses", async (req, res) => {
  const { _id: userId } = res.locals.user;
  const data = await getEnrolledCourses(userId);
  res.send(data);
});

export default courseRouter;