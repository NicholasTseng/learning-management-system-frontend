import { create } from 'zustand';

type Course = {
  id: number;
  title: string;
  description: string;
};

interface CourseStore {
  courses: Course[];
  setCourses: (newCourses: Course[]) => void;
  fetchCourses: () => Promise<void>;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],

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
        },
        {
          id: 2,
          title: 'Course 2',
          description: 'This is the second course',
        },
      ];

      set({ courses });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  },
}));
