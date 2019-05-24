import React from 'react';
import { Button, Popconfirm } from 'antd';

import EditDialog from './EditDialog';
import ViewDetailButton from './ViewDetailButton';
import { updateById, remove } from './actions';

const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: '_id',
  //   key: '_id',
  // },
  {
    title: 'Code',
    dataIndex: 'javCode',
    key: 'javCode',
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'javName',
    key: 'javName',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    width: 100,
    render: tags => tags.join(', '),
  },
  {
    title: 'Actions',
    dataIndex: '_id',
    key: 'actions',
    width: 300,
    render: (id, record) => {
      const updateRecord = values => updateById(id, values).then(this.reloadTable);
      return [
        <ViewDetailButton key="view-detail-btn" values={record} />,
        ' ',
        <EditDialog key="edit-btn" initialValues={record} updateRecord={updateRecord}>
          <Button>Edit</Button>
        </EditDialog>,
        ' ',
        <Popconfirm
          key="delete-btn"
          title="Are you sure delete this task?"
          onConfirm={() => remove(id).then(this.reloadTable)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>,
      ];
    },
  },
];

export default columns;
