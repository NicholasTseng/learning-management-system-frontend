import { Navbar, CourseEntry } from '../../components';
import { useCourseStore, useUserStore } from '../../store';
import styles from './DashboardPage.module.css';
import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export function LearnerView() {
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourseStore();
  const { user } = useUserStore();
  const subscribedCourses = useMemo(
    () => courses.filter((course) => course.learners.includes(user.id)),
    [courses, user.id],
  );
  const allCourses = useMemo(
    () => courses.filter((course) => !course.learners.includes(user.id)),
    [courses, user.id],
  );
  const onSubscribeCourse = useCallback(
    (id: number) => {
      const course = courses.find((course) => course.id === id);
      api.put(`course/subscribe-course/${id}`);

      if (!course) return;

      updateCourse({
        ...course,
        learners: [...course.learners, user.id],
      });
    },
    [courses, updateCourse, user.id],
  );
  const onUnsubscribeCourse = useCallback(
    (id: number) => {
      const course = courses.find((course) => course.id === id);
      api.put(`course/unsubscribe-course/${id}`);

      if (!course) return;

      updateCourse({
        ...course,
        learners: course.learners.filter((learner) => learner !== user.id),
      });
    },
    [courses, updateCourse, user.id],
  );
  const onEnterCourse = useCallback(
    (id: number) => {
      navigate(`/course/${id}`);
    },
    [navigate],
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h3>Subscribed Courses</h3>
        </div>
        <div className={styles.courseEntryList}>
          {subscribedCourses.map((course) => (
            <CourseEntry
              key={course.id}
              course={course}
              unsubscribeCourse={onUnsubscribeCourse}
              enterCourse={onEnterCourse}
            />
          ))}
        </div>
        <div className={styles.headingContainer}>
          <h3>All Courses</h3>
        </div>
        <div className={styles.courseEntryList}>
          {allCourses.map((course) => (
            <CourseEntry
              key={course.id}
              course={course}
              subscribeCourse={onSubscribeCourse}
            />
          ))}
        </div>
      </div>
    </>
  );
}
