import { Card, Button } from 'antd';
import styles from './CourseEntry.module.css';

type Course = {
  id: number;
  title: string;
  description: string;
};

export interface CourseEntryProps {
  course: Course;
  editCourse: (id: number) => void;
}

export function CourseEntry({ course, editCourse }: CourseEntryProps) {
  return (
    <Card
      title={course.title}
      style={{ width: '100%' }}
      actions={[
        <div className={styles.editButton}>
          <Button block type="primary" onClick={() => editCourse(course.id)}>
            Edit
          </Button>
        </div>,
      ]}
    >
      <p>{course.description}</p>
    </Card>
  );
}
