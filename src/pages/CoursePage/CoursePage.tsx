import type { Info, Video } from '../../components';
import { Navbar, VideoEntry, EditModal } from '../../components';
import { Button, Card } from 'antd';
import styles from './CoursePage.module.css';
import { useCourseStore, useUserStore } from '../../store';
import { useMemo, useState, useCallback, useEffect } from 'react';

export function CoursePage() {
  const { user } = useUserStore();
  const { courses, updateCourse } = useCourseStore();
  const courseId = useMemo(
    () => Number(window.location.pathname.split('/').pop()),
    [],
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const course = useMemo(
    () => courses.find((c) => c.id === courseId),
    [courses, courseId],
  );

  const onEditCourse = useCallback(
    (values: Info) => {
      updateCourse({ id: courseId, ...course, ...values });
      setIsEditModalVisible(false);
    },
    [course, updateCourse, courseId],
  );

  const editModalProps = useMemo(
    () => ({
      visible: isEditModalVisible,
      title: 'Edit Course',
      initialValues: {
        title: course?.title || '',
        description: course?.description || '',
      },
      onConfirm: onEditCourse,
      onCancel: () => setIsEditModalVisible(false),
    }),
    [course?.title, course?.description, isEditModalVisible, onEditCourse],
  );

  const onEditVideo = useCallback((id: number, info: Partial<Video>) => {
    setVideoList((videos) =>
      videos.map((v) => (v.id === id ? { ...v, ...info } : v)),
    );
  }, []);

  const onRemoveVideo = useCallback((id: number) => {
    setVideoList((videos) => videos.filter((v) => v.id !== id));
  }, []);

  useEffect(function fetchVideoList() {
    // TODO: Fetch video list from the backend
    setVideoList([
      {
        id: 1,
        title: 'Introduction to React',
        description: 'Learn the basics of React',
        url: 'https://www.youtube.com/embed/Ke90Tje7VS0',
      },
      {
        id: 2,
        title: 'Introduction to Angular',
        description: 'Learn the basics of Angular',
        url: 'https://storage.googleapis.com/lbs-bucket/uploads/7a4dc7d79938557e787befefd47e2d459f634a290767cc5c8fcb25cc19689f7b.mp4.mp4',
      },
      {
        id: 3,
        title: 'Introduction to Vue',
        description: 'Learn the basics of Vue',
        url: 'https://www.youtube.com/embed/4deVCNJq3qc',
      },
    ]);
  }, []);

  if (!course) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div>
          <Card
            title={course.title || ''}
            extra={
              user.role === 'educator' && (
                <Button
                  type="primary"
                  onClick={() => setIsEditModalVisible(true)}
                >
                  Edit
                </Button>
              )
            }
          >
            <p>{course.description}</p>
          </Card>
        </div>
        <div className={styles.videoEntryList}>
          {videoList.map((video) => (
            <VideoEntry
              key={video.id}
              video={video}
              editVideo={onEditVideo}
              removeVideo={onRemoveVideo}
              showPlayButton={user.role === 'learner'}
            />
          ))}
        </div>
        <EditModal {...editModalProps} />
      </div>
    </>
  );
}
