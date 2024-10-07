import { create } from 'zustand';

type Course = {
  id: number;
  title: string;
  description: string;
  learners: number[];
};

interface CourseStore {
  courses: Course[];
  setCourses: (newCourses: Course[]) => void;
  fetchCourses: () => Promise<void>;
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

  fetchCourses: async () => {
    try {
      // TODO: Hook up with the API
      // const response = await fetch('/api/courses');
      const courses: Course[] = [
        {
          id: 1,
          title: 'Course 1',
          description: 'This is the first course',
          learners: [1, 2],
        },
        {
          id: 2,
          title: 'Course 2',
          description: 'This is the second course',
          learners: [2, 3, 4],
        },
        {
          id: 3,
          title: 'Course 3',
          description: 'This is the third course',
          learners: [5],
        },
      ];

      set({ courses });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  },

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
