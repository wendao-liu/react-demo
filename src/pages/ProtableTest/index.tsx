import React, { useRef, useMemo, useEffect, useState } from 'react';
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { VList } from 'virtuallist-antd';
import { getUserColumns, getColumnsQuery } from './api';
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

const dataSource = Array.from({ length: 50 }).map((_, index) => ({
  id: index,
}));

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      //   resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    });
  }, []);
  const [columns, setColumns] = useState<ProColumns<GithubIssueItem>[]>([]);

  const getColumns = async () => {
    const { elements } = await getUserColumns();
    if (Array.isArray(elements)) {
      setColumns(elements);
    }
  };

  const getFilterField = async () => {
    const { all, defaultFields } = await getColumnsQuery();
  };

  const init = () => {
    getColumns();
    getFilterField();
  };
  useEffect(() => {
    init();
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
        }}
        editable={{
          type: 'multiple',
          onValuesChange: (record, recordList) => {
            console.log(recordList);
          },
          onSave: async () => {
            return true;
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel], //显示保存/取消
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
        headerTitle="虚拟表格"
      />
    </>
  );
};
