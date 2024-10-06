import { Card, Button } from 'antd';
import { useMemo, useState } from 'react';
import styles from './CourseEntry.module.css';
import { Confirm } from '../../components';

type Course = {
  id: number;
  title: string;
  description: string;
};

export interface CourseEntryProps {
  course: Course;
  editCourse: (id: number) => void;
  removeCourse: (id: number) => void;
}

export function CourseEntry({
  course,
  editCourse,
  removeCourse,
}: CourseEntryProps) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const confirmProps = useMemo(
    () => ({
      title: 'Remove Course',
      content: 'Are you sure you want to remove this course?',
      onConfirm: () => {
        removeCourse(course.id);
        setIsConfirmVisible(false);
      },
      onCancel: () => setIsConfirmVisible(false),
      visible: isConfirmVisible,
    }),
    [course.id, removeCourse, isConfirmVisible],
  );

  const actions = useMemo(
    () => [
      <div className={styles.editButton}>
        <Button block type="primary" onClick={() => editCourse(course.id)}>
          Edit
        </Button>
      </div>,
      <div className={styles.editButton}>
        <Button
          block
          type="default"
          onClick={() => setIsConfirmVisible(true)}
          danger
        >
          Remove
        </Button>
      </div>,
    ],
    [editCourse, course.id],
  );

  return (
    <>
      <Card title={course.title} style={{ width: '100%' }} actions={actions}>
        <p>{course.description}</p>
      </Card>
      <Confirm {...confirmProps} />
    </>
  );
}
