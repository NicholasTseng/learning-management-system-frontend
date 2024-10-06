import { Modal, Form, Input, Button } from 'antd';

export type Info = {
  title: string;
  description: string;
};

interface EditModalProps {
  visible: boolean;
  title: string;
  initialValues: Info;
  onConfirm: (values: Info) => void;
  onCancel: () => void;
}

export function EditModal({
  visible,
  title,
  initialValues,
  onConfirm,
  onCancel,
}: EditModalProps) {
  return (
    <Modal title={title} open={visible} onCancel={onCancel} footer={null}>
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={onConfirm}
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
