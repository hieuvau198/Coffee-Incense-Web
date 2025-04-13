import {
  Form,
  Input,
  Button,
  Card,
  Switch,
  Select,
  Space,
  Divider,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import RenderBoldTitle from '@/app/components/RenderBoldTitle';

const Settings = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className={`space-y-6 transition-all duration-300`}>
      <h1 className="text-2xl font-bold">Settings</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          siteName: "EBC",
          siteEmail: "contact@EBC.com",
          sitePhone: "+1 234 567 8900",
          currency: "VND",
          timezone: "UTC",
          enableNotifications: true,
          enableEmailNotifications: true,
          enableSMSNotifications: false,
        }}
      >
        <Card title={RenderBoldTitle("General Settings")} className="mb-6">
          <Form.Item
            label="Site Name"
            name="siteName"
            rules={[{ required: true, message: "Please input site name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Site Email"
            name="siteEmail"
            rules={[
              { required: true, message: "Please input site email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Site Phone"
            name="sitePhone"
            rules={[{ required: true, message: "Please input site phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Currency" name="currency">
            <Select
              options={[
                { value: "USD", label: "USD ($)" },
                { value: "EUR", label: "EUR (€)" },
                { value: "GBP", label: "GBP (£)" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Timezone" name="timezone">
            <Select
              options={[
                { value: "UTC", label: "UTC" },
                { value: "EST", label: "EST" },
                { value: "PST", label: "PST" },
              ]}
            />
          </Form.Item>
        </Card>

        <Card title={RenderBoldTitle("Notification Settings")} className="mb-6">
          <Form.Item
            label="Enable Notifications"
            name="enableNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Email Notifications"
            name="enableEmailNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="SMS Notifications"
            name="enableSMSNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Card>

        <Card title={RenderBoldTitle("Payment Settings")} className="mb-6">
          <Form.Item
            label="Stripe Public Key"
            name="stripePublicKey"
            rules={[
              { required: true, message: "Please input Stripe public key!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Stripe Secret Key"
            name="stripeSecretKey"
            rules={[
              { required: true, message: "Please input Stripe secret key!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="PayPal Client ID"
            name="paypalClientId"
            rules={[
              { required: true, message: "Please input PayPal client ID!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="PayPal Secret"
            name="paypalSecret"
            rules={[{ required: true, message: "Please input PayPal secret!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Card>

        <Divider />

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Changes
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
