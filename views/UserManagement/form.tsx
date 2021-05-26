import React, { useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col, Space, Input, Button, Card } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useFormik } from 'formik';

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';
import { ActivityStore } from '@stores/ActivityStore';
import { PropsInterface, initialValues, validationSchema } from './schema';

export default function UserManagementForm(props: PropsInterface) {
  const isNew = props.isNew;
  const id = props.id;
  const title = (isNew)?'New':'Edit';

  const router = useRouter();
  const { setServerResult } = useContext(ActivityStore);

  const formik = useFormik({
    initialValues,
    validationSchema,
    
    onSubmit: async (values: any, { setSubmitting }) => {
      const response = await api.post('/user', values);
      const result = await response.json();

      if (response.ok) {
        router.push('/user');
      }

      setServerResult(result);
      setSubmitting(false);
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <Card title={title}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'firstName'}
                value={formik.values.firstName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <small style={{ color: "#d50000" }}>{formik.errors.firstName}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'lastName'}
                value={formik.values.lastName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <small style={{ color: "#d50000" }}>{formik.errors.lastName}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'userName'}
                value={formik.values.userName} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.userName && formik.touched.userName && (
                <small style={{ color: "#d50000" }}>{formik.errors.userName}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'email'}
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.email && formik.touched.email && (
                <small style={{ color: "#d50000" }}>{formik.errors.email}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              New Password
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'newPassword'}
                type={'password'}
                value={formik.values.newPassword} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <small style={{ color: "#d50000" }}>{formik.errors.newPassword}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Confirm New Password
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'confirmNewPassword'}
                type={'password'}
                value={formik.values.confirmNewPassword} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword && (
                <small style={{ color: "#d50000" }}>{formik.errors.confirmNewPassword}</small>
              )}
            </Col>

            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              <Input 
                name={'phoneNumber'}
                value={formik.values.phoneNumber} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <small style={{ color: "#d50000" }}>{formik.errors.phoneNumber}</small>
              )}
            </Col>
          </Row>
        </Card>        

        <StickArea>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />}
              shape={'circle'} 
              size={'large'}
              onClick={() => router.push('/user')}
            />

            <Button 
              icon={<SaveOutlined />}
              type={'primary'} 
              htmlType={'submit'}
              shape={'circle'} 
              size={'large'}
              loading={formik.isSubmitting}
            />
          </Space>
        </StickArea>
      </form>
    </React.Fragment>
  )
}