import { useCallback } from 'react';
import { Modal, Form, Input, Button, Tabs } from 'antd';

interface LoginModalProps {
  opened: boolean;
  closeLoginModal: () => void;
}

export function LoginModal({ opened, closeLoginModal }: LoginModalProps) {
  const [form] = Form.useForm();

  const handleLogin = useCallback((values: unknown) => {
    console.log('Login values:', values);
    // Add login logic here
  }, []);

  const handleSignUp = useCallback((values: unknown) => {
    console.log('SignUp values:', values);
    // Add sign up logic here
  }, []);

  return (
    <Modal title="Login" open={opened} footer={null} onCancel={closeLoginModal}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Login" key="1">
          <Form form={form} onFinish={handleLogin}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Signup" key="2">
          <Form form={form} onFinish={handleSignUp}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
