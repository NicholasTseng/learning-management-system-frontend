import { useCallback } from 'react';
import { Modal, Tabs } from 'antd';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { userLoginInfo, userSignUpInfo } from './LoginModal.type';

interface LoginModalProps {
  opened: boolean;
  closeLoginModal: () => void;
}

export function LoginModal({ opened, closeLoginModal }: LoginModalProps) {
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

  const handleSignUp = useCallback(
    async (info: userSignUpInfo) => {
      try {
        const { username, password, email, role } = info;
        const encodedPassword = btoa(password);
        const signUpResponse = await api.post('/auth/register', {
          username,
          password: encodedPassword,
          email,
          role,
        });

        const { token } = signUpResponse.data as unknown as { token: string };
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error as Error);
      }
    },
    [navigate],
  );

  return (
    <Modal title="Login" open={opened} footer={null} onCancel={closeLoginModal}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Login" key="1">
          <LoginForm handleLogin={handleLogin} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="SignUp" key="2">
          <SignUpForm handleSignUp={handleSignUp} />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
