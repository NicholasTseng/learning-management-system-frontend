import { Form, Input, Button } from 'antd';
import { useState, useCallback } from 'react';
import { userLoginInfo } from './LoginModal.type';

export default function LoginForm({
  handleLogin,
}: {
  handleLogin: (info: userLoginInfo) => void;
}) {
  const [loginForm] = Form.useForm();
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const handleFormChange = useCallback(() => {
    const fields = loginForm.getFieldsValue();
    const allFieldsFilled = Object.values(fields).every((field) => field);
    setIsLoginDisabled(!allFieldsFilled);
  }, [loginForm]);

  return (
    <Form
      form={loginForm}
      onFinish={handleLogin}
      onFieldsChange={handleFormChange}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isLoginDisabled}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
