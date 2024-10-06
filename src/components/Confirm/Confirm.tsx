import { Modal } from 'antd';

interface ConfirmProps {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Confirm({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <p>{content}</p>
    </Modal>
  );
}
