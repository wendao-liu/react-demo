import React, { useRef, useMemo, useEffect, useState } from 'react';
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { EditableProTable, ProTable } from '@ant-design/pro-components';
import { VList } from 'virtuallist-antd';
import { getUserColumns, getColumnsQuery } from './api';
import { transformField } from '../utils/fieldHelper';
import _ from 'lodash';

import {
  TFootQuery,
  IStatusFilter,
  TAllConditions,
  IValueObject,
  TConditionSelect,
  TForm,
  IQueryObject,
  IStatusSetting,
  TUrlMap,
  IFormValueObject,
  TSelectMap,
} from './interface';

interface IRequireFieldMap {
  [key: string]: string | undefined;
}

const dataSource = Array.from({ length: 10000 }).map((_, index) => ({
  id: index,
  companyName: index,
}));

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [selectMapping, setSelectMapping] = useState({});
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      //   resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    });
  }, []);
  const [columns, setColumns] = useState<ProColumns[]>([]);
  const getColumns = async () => {
    const { elements } = await getUserColumns();
    if (Array.isArray(elements)) {
      // option
      setColumns([
        ...elements,
        {
          title: '操作',
          valueType: 'option',
          width: 200,
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              编辑
            </a>,
          ],
        },
      ]);
    }
  };

  const setSelectMappingById = (id, options) => {
    setSelectMapping({ ...selectMapping, [id]: options });
  };
  console.log({ selectMapping });

  const getFilterField = async () => {
    const result = await getColumnsQuery();
    const { all, statusFilter, statusSetting } = result;
    let defaultConditionIds = result.defaultFields;
    let allConditions: TAllConditions = {},
      allFields = [],
      conditionSelectList: TConditionSelect = [],
      statusConditionSelectList: TConditionSelect = [],
      requireFieldsMap: IRequireFieldMap = {};
    Array.isArray(all) &&
      all.forEach((item) => {
        let field = transformField(item, setSelectMappingById);
        allFields.push(field);
        if (field.props.filterField) {
          return;
        }
        if (field.props.required) {
          requireFieldsMap[field.id] = field.props.fieldCn;
          if (!_.includes(defaultConditionIds, field.id)) {
            defaultConditionIds.push(field.id);
          }
        }
        allConditions[field.id] = field;
        conditionSelectList.push({
          code: field.id,
          name: field.props.fieldCn!,
        });
        if (field.props.fieldType !== 'CascaderSelect') {
          statusConditionSelectList.push({
            code: field.id,
            name: field.props.fieldCn!,
          });
        }
      });
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
      <ProTable
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
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: dataSource,
                page: 1,
                success: true,
                total: dataSource.length,
              });
            }, 2000);
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
          // editableKeys: ['id'],
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
