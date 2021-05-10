import React, { useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import { Row, Col, Space, Input, Button } from 'antd';
import { LoginOutlined, UndoOutlined } from "@ant-design/icons";

import Api from '@helpers/Api';
import { AuthStore } from '@stores/AuthStore';
import { initialValues, validationSchema } from './schema';

export default function LoginForm() {
  const router = useRouter();
  const { dispatch } = useContext(AuthStore);
  const userNameRef = useRef(null);

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      const token = '727f3d03-52e3-43d2-af80-1c3912c45194';
      const userInfo = {
        userName: values.userName,
        email: 'f.anaturdasa@gmail.com',
      };

      const response = await Api.post('/api/auth/login', values);
      const result = await response.json();

      if (response.ok) {
        dispatch({
          type: 'login',
          payload: {
            authInfo: { token },
            userInfo: userInfo,
          }
        })

        router.push('/');
      }
      else {
        alert('error: ' + JSON.stringify(result));
      }

      setSubmitting(false);
    }
  });

  useEffect(() => {
    // userNameRef.current.focus();
  }, []); // Second param empty, mean only execute once time

  const handleReset = () => {
    formik.resetForm();
    userNameRef.current.focus();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row gutter={[8, 16]}>
        <Col span={6}>Username</Col>
        <Col span={18}>
          <Input
            ref={userNameRef}
            id={'userName'}
            name={'userName'}
            placeholder={'Username'}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.errors.userName && formik.touched.userName && (
            <small style={{ color: "#d50000" }}>{formik.errors.userName}</small>
          )}
        </Col>
      
        <Col span={6}>Password</Col>
        <Col span={18}>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.errors.password && formik.touched.password && (
            <small style={{ color: "#d50000" }}>{formik.errors.password}</small>
          )}
        </Col>

        <Col span={6} />
        <Col span={18}>
          <Space>
            <Button 
              htmlType={'submit'} 
              type={'primary'}
              loading={formik.isSubmitting}
            >
              <LoginOutlined />
              Login
            </Button>
            <Button 
              onClick={handleReset}
              disabled={formik.isSubmitting}
            >
              <UndoOutlined />
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
    </form>
  )
}
