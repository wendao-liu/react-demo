import React, { useRef, useMemo } from 'react';

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import request from 'umi-request';
import { VList } from 'virtuallist-antd';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '时间',
    dataIndex: 'time',
    valueType: 'date',
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st it8em</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const dataSource = Array.from({ length: 1000 }).map((_, index) => ({
  id: index,
}));

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    });
  }, []);
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        components={vc1}
        scroll={{ y: '55vh', x: '100%' }}
        request={async (params = {}, sort, filter) => {
          console.log({
            sort,
            filter,
            formRef: formRef?.current?.getFieldsValue(),
          });
          return Promise.resolve({
            data: dataSource,
            page: 1,
            success: true,
            total: dataSource.length,
          });
          //   return request<{
          //     data: GithubIssueItem[];
          //   }>('https://proapi.azurewebsites.net/github/issues', {
          //     params,
          //   });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: (selects) => {
            console.log({ selects });
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        formRef={formRef}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        // pagination={{
        //   pageSize: 5,
        //   onChange: (page) => console.log(page),
        // }}
        pagination={false}
        dateFormatter="string"
        headerTitle="高级表格1"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </>
  );
};
