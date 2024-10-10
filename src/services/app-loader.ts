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
  const { user } = useUserStore.getState();

  try {
    const isEducator = user.role === 'educator';
    const route = isEducator
      ? '/course/get-courses/me'
      : '/course/get-courses/all';
    const response = await api.get(route);

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

export async function loadApp() {
  const userToken = Cookies.get('user_token');

  if (!userToken) return;

  await fetchUser();
  await fetchCourses();
}
