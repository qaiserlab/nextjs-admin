import React, { useEffect, useContext, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { Row, Col, Space, Typography } from 'antd'
import { LoginOutlined, UndoOutlined } from "@ant-design/icons"

import axios from '@helpers/axiosInstance'
import Input from '@components/Input'
import Button from '@components/Button'
import StickArea from '@components/StickArea'
import { ActivityStore } from '@stores/ActivityStore'
import { AuthStore } from '@stores/AuthStore'
import ServerAlert from '@widgets/ServerAlert'
import { initialValues, validationSchema } from './schema'

const { Text } = Typography

export default function LoginForm() {
  const router = useRouter()
  
  const { setServerSaid, clearServerSaid } = useContext(ActivityStore)
  const { dispatch } = useContext(AuthStore)
  
  const usernameRef = useRef(null)

  const formik = useFormik({
    initialValues,
    validationSchema,
    
    onSubmit: async (values, { setSubmitting }) => {

      try {
        const formData = {
          username: values.username,
          password: values.password,
        }
        const response = await axios.post(
          '/auth/login',
          formData
        )
        const data = response.data
        const authInfo = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }

        dispatch({
          type: 'login',
          payload: { authInfo }
        })

        clearServerSaid()
        router.push('/')
      }
      catch (error: AxiosError | any) {
        const status = error?.response?.status
        const message = error?.response?.data?.error
        setServerSaid({ status, message })
      }
      finally {
        setSubmitting(false)
      }

    },
    
  })

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      usernameRef.current.focus()
    }
  }, [])

  const handleReset = () => {
    formik.resetForm()
    usernameRef.current.focus()
  }

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <StickArea align={'center'} valign={'center'}>
        <form 
          onSubmit={formik.handleSubmit}
          style={{width: '300px'}}
        >
          <ServerAlert />

          <Row gutter={[8, 16]}>
            <Col span={6}>Username</Col>
            <Col span={18}>
              <Input
                ref={usernameRef}
                name={'username'}
                placeholder={'Username'}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.username && formik.touched.username && (
                <Text type={'danger'}>{formik.errors.username}</Text>
              )}
            </Col>
          
            <Col span={6}>Password</Col>
            <Col span={18}>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.password && formik.touched.password && (
                <Text type={'danger'}>{formik.errors.password}</Text>
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
      </StickArea>
    </React.Fragment>
  )
}
