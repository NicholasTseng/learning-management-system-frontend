import { useCallback, useState, useMemo, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Navbar, Confirm, PasswordModal } from '../../components';
import { useUserStore, User } from '../../store';
import api from '../../services/api';

export function UserProfilePage() {
  const [form] = Form.useForm();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { user, setUser } = useUserStore();
  const confirmProps = useMemo(
    () => ({
      title: 'Save Changes',
      content: 'Are you sure you want to save your changes?',
      onConfirm: () => {
        form.submit();
        setIsConfirmVisible(false);
      },
      onCancel: () => setIsConfirmVisible(false),
      visible: isConfirmVisible,
    }),
    [form, isConfirmVisible],
  );
  const onSaveChangePassword = useCallback((password: string) => {
    const encodedPassword = btoa(password);
    api.put('/user/update-password', {
      password: encodedPassword,
    });
    setIsPasswordModalVisible(false);
  }, []);
  const passwordModalProps = useMemo(
    () => ({
      visible: isPasswordModalVisible,
      onClose: () => setIsPasswordModalVisible(false),
      onSave: onSaveChangePassword,
    }),
    [isPasswordModalVisible, onSaveChangePassword],
  );
  const onFinish = useCallback(
    (values: User) => {
      api.put('/user/update-username', {
        username: values.username,
      });
      setUser(values);
      setIsSaveDisabled(true);
    },
    [setUser, setIsSaveDisabled],
  );

  useEffect(
    function setUserFormValues() {
      form.setFieldsValue(user);
    },
    [form, user],
  );

  return (
    <>
      <Navbar />
      <Card
        title="User Profile"
        style={{ maxWidth: 600, margin: '0 auto', marginTop: 20 }}
      >
        <Form
          form={form}
          name="userProfile"
          layout="vertical"
          onFinish={onFinish}
          onFieldsChange={() => setIsSaveDisabled(false)}
        >
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Input disabled />
          </Form.Item>
          <Form.Item shouldUpdate>
            <Row gutter={8}>
              <Col>
                <Button
                  type="primary"
                  disabled={isSaveDisabled}
                  onClick={() => setIsConfirmVisible(true)}
                >
                  Save Changes
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  onClick={() => setIsPasswordModalVisible(true)}
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
      <Confirm {...confirmProps} />
      <PasswordModal {...passwordModalProps} />
    </>
  );
}
