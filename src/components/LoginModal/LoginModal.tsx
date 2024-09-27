import { useCallback } from 'react';
import { Modal, Form, Input, Button, Tabs } from 'antd';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

type userLoginInfo = {
  username: string;
  password: string;
};
interface LoginModalProps {
  opened: boolean;
  closeLoginModal: () => void;
}

export function LoginModal({ opened, closeLoginModal }: LoginModalProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (info: userLoginInfo) => {
      try {
        const { username, password } = info;
        const encodedPassword = btoa(password);
        const loginResponse = await api.post('/auth/login', {
          username,
          password: encodedPassword,
        });

        const { token } = loginResponse.data as unknown as { token: string };
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error as Error);
      }
    },
    [navigate],
  );

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
