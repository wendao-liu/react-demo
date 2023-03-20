import React, { useRef, useMemo, useState, useContext } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProProvider,
} from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Input } from 'antd';
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

const menu = (
  <Menu>
    <Menu.Item key="1">1st it8em</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const dataSourceInit = Array.from({ length: 1000 }).map((_, index) => ({
  id: index,
}));

const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
}> = ({ value, onChange, ...rest }) => {
  const ref = useRef<any>(null);
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (
      inputValue &&
      tempsTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
        {...rest}
      />
    </Space>
  );
};

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [dataSource, setDataSource] = useState(dataSourceInit);
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    });
  }, []);
  const values = useContext(ProProvider);

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
      valueType: 'input',
      // renderFormItem: (text, props) => {
      //   console.log({ props });

      //   return <TagList {...props} {...props?.fieldProps} />;
      // },
      fieldProps: (form, config) => {
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

            paste.forEach((p, index1) => {
              p.forEach((v, index2) => {
                dataSource[rowIndex + index1][changeColumes[index2]] = v;
              });
            });
            setTimeout(() => {
              setDataSource([...dataSource]);
              actionRef.current?.reload();
            });
            e.preventDefault();
            e.stopPropagation();
          },
        };
      },
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
      render: (text, record, _, action) => {
        return [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            href={record.url}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
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
        ];
      },
    },
  ];
  console.log({ dataSource });
  return (
    <>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            link: {
              render: (text) => <a>{text}</a>,
              renderFormItem: (text, props) => (
                <Input placeholder="请输入链接" {...props?.fieldProps} />
              ),
            },
            tags: {
              render: (text) => {
                return (
                  <>
                    {[text].flat(1).map((item) => (
                      <Tag key={item.value}>{item.label}</Tag>
                    ))}
                  </>
                );
              },
              renderFormItem: (text, props) => {
                const { onPaste } = props?.fieldProps || {};
                // const handlePaste = () => {
                //   onPaste(e,);
                // };
                return <TagList {...props} {...props?.fieldProps} />;
              },
            },
          },
        }}
      >
        <ProTable<GithubIssueItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          components={vc1}
          scroll={{ y: '55vh', x: '100%' }}
          dataSource={dataSource}
          request={async (params = {}, sort, filter) => {
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
      </ProProvider.Provider>
    </>
  );
};
