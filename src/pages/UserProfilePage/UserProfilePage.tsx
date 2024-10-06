import { useCallback, useState, useMemo } from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { Navbar, Confirm, PasswordModal } from '../../components';
import { useUserStore, User } from '../../store';

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
    // TODO: Hook up with the backend to save the new password
    console.log('New password is:', password || 'empty');
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
      setUser(values);
      setIsSaveDisabled(true);
    },
    [setUser, setIsSaveDisabled],
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
          initialValues={user}
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
