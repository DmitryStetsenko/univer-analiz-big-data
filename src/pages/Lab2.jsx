import React from 'react';
import { ClusteringSimulation } from '../components/ClusteringSimulation';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const Lab2 = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Лабораторна робота №2</Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Тема: Ієрархічна агломеративна кластеризація методом найближчого сусіда (одиночного зв'язку).
        </Paragraph>
      </div>

      <ClusteringSimulation method="single" />
    </div>
  );
};
