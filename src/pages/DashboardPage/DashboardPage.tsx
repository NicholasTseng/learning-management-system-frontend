import { useCallback, useState } from 'react';
import { Navbar, CourseEntry, AddCourseModal } from '../../components';
import styles from './DashboardPage.module.css';
import { useCourseStore } from '../../store';
import { Button } from 'antd';

export function DashboardPage() {
  const { courses, setCourses } = useCourseStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onAddCourse = useCallback(
    (course: { title: string; description: string }) => {
      // TODO: Hook up with the API
      setCourses([
        {
          id: courses.length + 1,
          ...course,
        },
      ]);
    },
    [courses, setCourses],
  );

  return (
    <>
      <AddCourseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddCourse={onAddCourse}
      />
      <Navbar />
      <div className={styles.courseEntryList}>
        {courses.map((course) => (
          <CourseEntry
            key={course.id}
            course={course}
            editCourse={(id) => console.log(`Entering course with id ${id}`)}
          />
        ))}
        <Button
          type="dashed"
          block
          style={{
            height: '100%', // Make the button take up the card's height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
          onClick={() => setIsModalVisible(true)}
        >
          +
        </Button>
      </div>
    </>
  );
}
