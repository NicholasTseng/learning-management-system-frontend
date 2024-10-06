import { useCallback, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { userSignUpInfo } from './LoginModal.type';

export default function SignUpForm({
  handleSignUp,
}: {
  handleSignUp: (info: userSignUpInfo) => void;
}) {
  const [signUpForm] = Form.useForm();
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const handleFormChange = useCallback(() => {
    const fields = signUpForm.getFieldsValue();
    const allFieldsFilled = Object.values(fields).every((field) => field);
    setIsSignUpDisabled(!allFieldsFilled);
  }, [signUpForm]);

  return (
    <Form
      form={signUpForm}
      onFinish={handleSignUp}
      onFieldsChange={handleFormChange}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Select placeholder="Select your role">
          <Select.Option value="learner">Learner</Select.Option>
          <Select.Option value="educator">Educator</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSignUpDisabled}>
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}
