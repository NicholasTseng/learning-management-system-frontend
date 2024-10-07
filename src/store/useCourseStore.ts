import { create } from 'zustand';

export type Course = {
  id: number;
  title: string;
  description: string;
  learners: number[];
};

interface CourseStore {
  courses: Course[];
  setCourses: (newCourses: Course[]) => void;
  updateCourse: (course: Course) => void;
  removeCourse: (id: number) => void;
}

const initialState = {
  courses: [],
};

export const useCourseStore = create<CourseStore>((set) => ({
  ...initialState,

  setCourses: (newCourses) =>
    set((state) => ({ courses: [...state.courses, ...newCourses] })),

  updateCourse: (newCourse) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === newCourse.id ? newCourse : course,
      ),
    })),

  removeCourse: (id) => {
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },
}));
