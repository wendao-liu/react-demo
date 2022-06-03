// VisualTable.js
import React, { useMemo } from 'react';
import { Table } from 'antd';
import { VList } from 'virtuallist-antd';

const dataSource = Array.from({ length: 1000 }).map((_, index) => ({
  id: index,
}));
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
];
function VisualTable(props: any) {
  const vc1 = useMemo(() => {
    return VList({
      height: '55vh',
      vid: 'first',
      resetTopWhenDataChange: false, // 当数据改变时是否回滚顶部
    });
  }, []);

  return (
    <>
      {/* 所有之前业务逻辑通过props传入，基本不用做修改，特殊情况特殊处理 */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        /** 不建议使用x: max-content. 如果columns有fixed, x为max-content的话. ellipsis会失效 */
        scroll={{ y: '55vh', x: '100%' }}
        rowKey="id"
        components={vc1}
      />
    </>
  );
}

export default VisualTable;
