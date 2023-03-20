import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProForm,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590486176000',
  };
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const formRef = useRef<any>();
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: (
        <div>
          活动名称 <span>活动二</span>
        </div>
      ),
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
    },
  ];
  columns.forEach((item) => {
    item.fieldProps = (form, config) => {
      return {
        onBlur: () => {
          console.log('onBlur');
        },
        onFocus: () => {
          console.log('onFocus');
        },
        onKeyUp: (e) => {
          // 粘贴
          if (e.keyCode === 91) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        onPaste: (e) => {
          let { rowIndex, dataIndex } = config;

          const paste = e.clipboardData
            .getData('text')
            .split('\r\n')
            .reduce((prev, curr) => [...prev, curr.split('\t')], [])
            .filter((v) => !!v);

          const changeColumes = columns
            ?.reduce((prev, curr) => [...prev, curr.dataIndex], [])
            .filter((v) => !!v);

          while (changeColumes[0] !== dataIndex) {
            changeColumes.shift();
          }
          const newDataSource = [...dataSource];
          paste.forEach((p, index1) => {
            p.forEach((v, index2) => {
              if (newDataSource?.[rowIndex + index1]) {
                newDataSource[rowIndex + index1][changeColumes[index2]] = v;
              }
            });
          });
          setTimeout(() => {
            setDataSource([...newDataSource]);
            formRef.current?.setFieldsValue({
              table: newDataSource,
            });
          }, 0);
          e.preventDefault();
          e.stopPropagation();
        },
      };
    };
  });

  useEffect(() => {
    console.log(666);
    formRef.current?.setFields([
      {
        name: 'table',
        value: dataSource,
      },
      {
        name: ['table', '0', 'title'],
        value: '1234',
        errors: ['test-test-test-test11'],
      },
    ]);
  }, []);
  // console.log(formRef.current?.getFieldsError(),'666');

  console.log(dataSource, 'dataSource');

  return (
    <>
      <Button
        onClick={() => {
          formRef.current?.setFields([
            {
              name: 'table',
              value: dataSource,
            },
            {
              name: ['table', '0', 'title'],
              value: '1234',
              errors: ['test-test-test-test11'],
            },
          ]);
        }}
      >
        手动错误
      </Button>
      <Button
        onClick={() => {
          console.log(formRef?.current?.getFieldsError());
        }}
      >
        获取错误
      </Button>
      <ProForm<{
        table: DataSourceType[];
      }>
        formRef={formRef}
        // initialValues={{
        //   table: dataSource,
        // }}
        // validateTrigger="onBlur"
        validateTrigger="onChange"
      >
        <EditableProTable<DataSourceType>
          bordered
          headerTitle="可编辑表格"
          columns={columns}
          name="table"
          rowKey="id"
          scroll={{
            x: 960,
          }}
          value={dataSource}
          onChange={setDataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          toolBarRender={() => {
            return [
              <Button
                type="primary"
                key="save"
                onClick={() => {
                  // dataSource 就是当前数据，可以调用 api 将其保存
                  dataSource[0].title = '123';
                  setDataSource([...dataSource]);
                }}
              >
                保存数据
              </Button>,
            ];
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [
                <a
                  key="delete"
                  onClick={() => {
                    const tableDataSource = formRef.current?.getFieldValue(
                      'table',
                    ) as DataSourceType[];
                    const filterTable = tableDataSource.filter(
                      (item) => item.id !== row?.id,
                    );

                    console.log({ filterTable, tableDataSource });
                    console.log({ row, config, defaultDoms });

                    formRef.current?.setFieldsValue({
                      table: filterTable,
                    });

                    // formRef.current?.setFields([
                    //   {
                    //     name: 'table',
                    //     value: filterTable,
                    //   },
                    // ]);
                  }}
                >
                  删除1
                </a>,
              ];
            },
            onValuesChange: (record, recordList) => {
              // setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm>
    </>
  );
};
