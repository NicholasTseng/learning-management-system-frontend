import api from './api';
import { useCourseStore, useUserStore, Course, User } from '../store';
import Cookies from 'js-cookie';

type CourseResponse = {
  id: number;
  name: string;
  description: string;
  student_ids: number[];
};

async function fetchCourses() {
  const { setCourses } = useCourseStore.getState();

  try {
    const response = await api.get('/course/get-courses');

    const courses = (response.data as CourseResponse[]).map(
      (course: CourseResponse) =>
        ({
          id: course.id,
          title: course.name,
          description: course.description,
          learners: course.student_ids || [],
        }) as Course,
    );

    setCourses(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
}

async function fetchUser() {
  const { setUser } = useUserStore.getState();

  try {
    const response = await api.get('/user/me');
    const user = response.data[0] as User;

    setUser(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

export function loadApp() {
  const userToken = Cookies.get('user_token');

  if (!userToken) return;

  fetchCourses();
  fetchUser();
}
