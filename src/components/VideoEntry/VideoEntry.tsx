import { useMemo, useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { EditModal } from '../../components';
import styles from './VideoEntry.module.css';

export type Video = {
  id: number;
  title: string;
  description: string;
  url: string;
};

interface VideoEntryProps {
  video: Video;
  editVideo: (id: number, info: Partial<Video>) => void;
  removeVideo: (id: number) => void;
  showPlayButton: boolean;
}

export function VideoEntry({
  video,
  editVideo,
  removeVideo,
  showPlayButton,
}: VideoEntryProps) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const confirmProps = useMemo(
    () => ({
      title: 'Remove Video',
      content: 'Are you sure you want to remove this video?',
      onConfirm: () => {
        removeVideo(video.id);
        setIsConfirmVisible(false);
      },
      onCancel: () => setIsConfirmVisible(false),
      visible: isConfirmVisible,
    }),
    [video.id, removeVideo, isConfirmVisible],
  );

  const actions = useMemo(
    () =>
      showPlayButton
        ? [
            <div className={styles.editButton}>
              <Button
                type="primary"
                target="_blank"
                rel="noopener noreferrer"
                block
                onClick={() => window.open(video.url)}
              >
                Watch Video
              </Button>
            </div>,
          ]
        : [
            <div className={styles.editButton}>
              <Button
                block
                type="primary"
                onClick={() => setIsEditModalVisible(true)}
              >
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
    [showPlayButton, video.url],
  );

  const editModalProps = useMemo(
    () => ({
      visible: isEditModalVisible,
      title: 'Edit Video',
      initialValues: {
        title: video.title,
        description: video.description,
      },
      onConfirm: (info: Partial<Video>) => {
        editVideo(video.id, info);
        setIsEditModalVisible(false);
      },
      onCancel: () => setIsEditModalVisible(false),
    }),
    [isEditModalVisible, video.title, video.description, video.id, editVideo],
  );

  return (
    <>
      <Card title={video.title} actions={actions} style={{ width: '100%' }}>
        <div className={styles.content}>
          <p>{video.description}</p>
          <iframe
            width="100%"
            src={video.url}
            title={video.title}
            style={{ border: 'none' }}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
      <Modal
        title={confirmProps.title}
        open={confirmProps.visible}
        onOk={confirmProps.onConfirm}
        onCancel={confirmProps.onCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>{confirmProps.content}</p>
      </Modal>
      <EditModal {...editModalProps} />
    </>
  );
}
