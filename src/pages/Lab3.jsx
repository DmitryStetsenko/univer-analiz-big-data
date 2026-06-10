import React from 'react';
import { ClusteringSimulation } from '../components/ClusteringSimulation';
import { Typography, Button } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Lab3 = () => {
  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Лабораторна робота №3</Title>
          <Paragraph style={{ color: '#8c8c8c', margin: '4px 0 0 0' }}>
            Тема: Ієрархічна агломеративна кластеризація методом найдальшого сусіда (повного зв'язку).
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<ExperimentOutlined />} 
          href="#/practical?tab=segmentation"
          style={{ background: 'linear-gradient(90deg, #1677ff, #722ed1)', border: 'none', borderRadius: 6 }}
        >
          Дивитись практичне застосування
        </Button>
      </div>

      <ClusteringSimulation method="complete" />
    </div>
  );
};

