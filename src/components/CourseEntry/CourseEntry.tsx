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
  editCourse?: (id: number) => void;
  removeCourse?: (id: number) => void;
  subscribeCourse?: (id: number) => void;
  unsubscribeCourse?: (id: number) => void;
  enterCourse?: (id: number) => void;
}

export function CourseEntry({
  course,
  editCourse,
  removeCourse,
  subscribeCourse,
  unsubscribeCourse,
  enterCourse,
}: CourseEntryProps) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const confirmProps = useMemo(
    () => ({
      title: 'Remove Course',
      content: 'Are you sure you want to remove this course?',
      onConfirm: () => {
        removeCourse?.(course.id);
        setIsConfirmVisible(false);
      },
      onCancel: () => setIsConfirmVisible(false),
      visible: isConfirmVisible,
    }),
    [course.id, removeCourse, isConfirmVisible],
  );

  const actions = useMemo(() => {
    const hasEdit = Boolean(editCourse);
    const hasRemove = Boolean(removeCourse);
    const hasSubscribe = Boolean(subscribeCourse);
    const hasUnsubscribe = Boolean(unsubscribeCourse);
    const hasEnter = Boolean(enterCourse);
    const actions = [];

    if (hasEdit)
      actions.push(
        <div className={styles.editButton}>
          <Button block type="primary" onClick={() => editCourse?.(course.id)}>
            Manage
          </Button>
        </div>,
      );

    if (hasRemove)
      actions.push(
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
      );

    if (hasSubscribe)
      actions.push(
        <div className={styles.editButton}>
          <Button
            block
            type="primary"
            onClick={() => subscribeCourse?.(course.id)}
          >
            Subscribe
          </Button>
        </div>,
      );

    if (hasEnter)
      actions.push(
        <div className={styles.editButton}>
          <Button block type="primary" onClick={() => enterCourse?.(course.id)}>
            Enter
          </Button>
        </div>,
      );

    if (hasUnsubscribe)
      actions.push(
        <div className={styles.editButton}>
          <Button
            block
            type="default"
            onClick={() => unsubscribeCourse?.(course.id)}
            danger
          >
            Unsubscribe
          </Button>
        </div>,
      );

    return actions;
  }, [
    editCourse,
    course.id,
    removeCourse,
    subscribeCourse,
    unsubscribeCourse,
    enterCourse,
  ]);

  return (
    <>
      <Card title={course.title} style={{ width: '100%' }} actions={actions}>
        <p>{course.description}</p>
      </Card>
      <Confirm {...confirmProps} />
    </>
  );
}
