import { Modal, Form, Input, Button } from 'antd';

interface PasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
}

export function PasswordModal({
  visible,
  onClose,
  onSave,
}: PasswordModalProps) {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values.password);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      title="Update Password"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
