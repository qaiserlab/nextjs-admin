import React from 'react';
import Head from 'next/head';
import { Space, Table, Button } from 'antd';
import { FileTextOutlined } from "@ant-design/icons";

import StickArea from '@components/StickArea';

export default function UserManagement() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];
  const records = [];

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head> 
      <section>
        <Table dataSource={records} columns={columns} />

        <StickArea>
          <Space>
            <Button type={'primary'} shape={'circle'} size={'large'}>
              <FileTextOutlined />
            </Button>
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  );
}