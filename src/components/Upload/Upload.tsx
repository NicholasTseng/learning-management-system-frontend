import { useEffect, useMemo } from 'react';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Cookies from 'js-cookie';

interface UploadProps {
  courseId: number;
  opened: boolean;
  onUploadComplete: (url: string) => void;
}

export function Upload({ courseId, opened, onUploadComplete }: UploadProps) {
  const token = Cookies.get('user_token');

  const uppy = useMemo(() => {
    const uppy = new Uppy({
      id: 'uppyInstance',
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/mp4'],
      },
      autoProceed: true,
    });

    uppy.use(XHRUpload, {
      endpoint: `${import.meta.env.VITE_API_URL}/video/upload`,
      formData: true,
      fieldName: 'video',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    uppy.on('complete', (result) => {
      if (!result?.successful || !result?.successful?.length) return;

      const url = result.successful[0].response?.body?.filePath || '';
      onUploadComplete(url);
    });

    return uppy;
  }, [token, onUploadComplete]);

  useEffect(() => {
    uppy.on('file-added', () => {
      uppy.setMeta({
        courseId: courseId,
        title: 'Video Title',
      });
    });

    return () => uppy.cancelAll();
  }, [uppy, courseId]);

  return (
    <DashboardModal
      uppy={uppy}
      proudlyDisplayPoweredByUppy={false}
      open={opened}
    />
  );
}
