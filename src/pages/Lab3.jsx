import React from 'react';
import { ClusteringSimulation } from '../components/ClusteringSimulation';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const Lab3 = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Лабораторна робота №3</Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Тема: Ієрархічна агломеративна кластеризація методом найдальшого сусіда (повного зв'язку).
        </Paragraph>
      </div>

      <ClusteringSimulation method="complete" />
    </div>
  );
};
