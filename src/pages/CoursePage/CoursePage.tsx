import type { Info, Video } from '../../components';
import { Navbar, VideoEntry, EditModal } from '../../components';
import { Button, Card } from 'antd';
import styles from './CoursePage.module.css';
import { useCourseStore, useUserStore } from '../../store';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { Upload } from '../../components';
import api from '../../services/api';

export function CoursePage() {
  const { user } = useUserStore();
  const { courses, updateCourse } = useCourseStore();
  const courseId = useMemo(
    () => Number(window.location.pathname.split('/').pop()),
    [],
  );
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const course = useMemo(
    () => courses.find((c) => c.id === courseId),
    [courses, courseId],
  );

  const onEditCourse = useCallback(
    (values: Info) => {
      if (!course) return;

      api.put(`/course/update-course/${courseId}`, {
        name: values.title,
        description: values.description,
      });
      updateCourse({ ...course, id: courseId, ...values });
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

  const onEditVideo = useCallback(
    (id: number, info: Partial<Video>) => {
      if (!course) return;

      api.put(`/video/update-video/${course.id}/${id}`, {
        title: info.title,
        description: info.description,
      });

      setVideoList((videos) =>
        videos.map((v) => (v.id === id ? { ...v, ...info } : v)),
      );
    },
    [course],
  );

  const onRemoveVideo = useCallback(
    (id: number) => {
      if (!course) return;
      api.delete(`/video/delete-video/${course.id}/${id}`);

      setVideoList((videos) => videos.filter((v) => v.id !== id));
    },
    [course],
  );

  const onUploadVideo = useCallback((url: string) => {
    setVideoList((videos) => [
      ...videos,
      {
        id: videos.length + 1,
        title: 'Video Title',
        description: '',
        url,
      },
    ]);
    setIsUploadModalVisible(false);
  }, []);

  useEffect(
    function fetchVideoList() {
      api.get(`/video/get-videos/${courseId}`).then((response) => {
        setVideoList(response.data);
      });
    },
    [courseId],
  );

  if (!course) return null;

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
          {user.role === 'educator' && (
            <Button
              type="dashed"
              block
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
              onClick={() => setIsUploadModalVisible(true)}
            >
              +
            </Button>
          )}
        </div>
        <EditModal {...editModalProps} />
        <Upload
          courseId={course.id}
          opened={isUploadModalVisible}
          onUploadComplete={onUploadVideo}
        />
      </div>
    </>
  );
}
