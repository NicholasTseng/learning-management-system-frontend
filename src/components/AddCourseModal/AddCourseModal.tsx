import { Modal, Form, Input } from 'antd';

interface AddCourseModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCourse: (course: { title: string; description: string }) => void;
}

export function AddCourseModal({
  visible,
  onClose,
  onAddCourse,
}: AddCourseModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onAddCourse(values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Add New Course"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Add Course"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" name="add_course_form">
        <Form.Item
          name="title"
          label="Course Title"
          rules={[
            { required: true, message: 'Please input the course title!' },
          ]}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Course Description"
          rules={[
            { required: true, message: 'Please input the course description!' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter course description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
