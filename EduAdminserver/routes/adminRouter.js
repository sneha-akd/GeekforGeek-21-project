import { Router } from "express";
import { createCourse, updateCourse, deleteCourse } from "../models/CourseModel";
import { refundCourse, getTopSellingCourses } from "../models/PurchaseModel";
const adminRouter = Router();

// create new course
adminRouter.post("/createCourse", async (req, res) => {
  const data = await createCourse(req.body);
  res.send({
    message: "Course created successfully!!!",
    data: data,
  });
});

// update existing course
adminRouter.put("/updateCourse/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const data = await updateCourse(courseId, req.body);
  res.send({
    message: "Course updated successfully!!!",
    data: data,
  });
});

adminRouter.delete("/deleteCourse/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const data = await deleteCourse(courseId);
  res.send({
    message: "Course deleted successfully!!!",
    data: data,
  });
});

adminRouter.post("/refund", async (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) {
    res.status(400);
    res.send({ message: "userId and courseId are required!!!" });
    return;
  }
  const data = await refundCourse({ courseId, userId });
  console.log("🚀 ~ data:", data);
  res.send({
    message: "Course refunded successfully!!!",
    data: data,
  });
});

adminRouter.get("/get-top-courses", async (req, res) => {
  const { limit = 3 } = req.query;
  const data = await getTopSellingCourses(parseInt(limit));
  res.send({ data, message: "Top selling courses" });
});

export default adminRouter;