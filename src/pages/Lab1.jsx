import React from 'react';
import { useStore } from '../store/useStore';
import { Table, Card, InputNumber, Row, Col, Typography, Divider, Space, Tag } from 'antd';
import { calculateEuclideanDistance } from '../utils/clustering';
import { CalculatorOutlined, InfoCircleOutlined, TableOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const Lab1 = () => {
  const { lab1Data, updateLab1Task1Object, updateLab1Task1Params, updateLab1Task2Object } = useStore();

  const { objects: t1Objects, p, r } = lab1Data.task1;
  const { objects: t2Objects } = lab1Data.task2;

  // Obj 5 & Obj 7
  const obj5 = t1Objects[0];
  const obj7 = t1Objects[1];

  // Calculate coordinates differences
  const dx1 = obj5.x1 - obj7.x1;
  const dx2 = obj5.x2 - obj7.x2;
  const absDx1 = Math.abs(dx1);
  const absDx2 = Math.abs(dx2);

  // Proximity calculations
  const euclidean = Math.sqrt(dx1 * dx1 + dx2 * dx2);
  const squaredEuclidean = dx1 * dx1 + dx2 * dx2;
  const manhattan = absDx1 + absDx2;
  const chebyshev = Math.max(absDx1, absDx2);
  const powerDistance = Math.pow(Math.pow(absDx1, p) + Math.pow(absDx2, p), 1 / r);

  // Table Columns for Task 1 coordinates
  const t1Columns = [
    {
      title: 'ID Об\'єкта',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Tag color="blue" style={{ fontSize: 14, padding: '4px 8px' }}>Об'єкт {text}</Tag>
    },
    {
      title: 'Параметр X1',
      dataIndex: 'x1',
      key: 'x1',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLab1Task1Object(index, 'x1', val)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Параметр X2',
      dataIndex: 'x2',
      key: 'x2',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLab1Task1Object(index, 'x2', val)}
          style={{ width: '100%' }}
        />
      )
    }
  ];

  // Columns for Task 2 coordinates
  const t2CoordsColumns = [
    {
      title: 'ID Об\'єкта',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Tag color="purple">Об'єкт {text}</Tag>
    },
    {
      title: 'Координата X1',
      dataIndex: 'x1',
      key: 'x1',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLab1Task2Object(index, 'x1', val)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Координата X2',
      dataIndex: 'x2',
      key: 'x2',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLab1Task2Object(index, 'x2', val)}
          style={{ width: '100%' }}
        />
      )
    }
  ];

  // Generate Matrix for Task 2
  const generateDistanceMatrix = () => {
    const matrix = [];
    for (let i = 0; i < t2Objects.length; i++) {
      const row = { id: t2Objects[i].id, key: t2Objects[i].id };
      for (let j = 0; j < t2Objects.length; j++) {
        row[`d_${t2Objects[j].id}`] = calculateEuclideanDistance(t2Objects[i], t2Objects[j], ['x1', 'x2']);
      }
      matrix.push(row);
    }
    return matrix;
  };

  const matrixData = generateDistanceMatrix();
  const matrixColumns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 100,
      render: (text) => <b style={{ color: '#722ed1' }}>Об'єкт {text}</b>
    },
    ...t2Objects.map(obj => ({
      title: `Об'єкт ${obj.id}`,
      dataIndex: `d_${obj.id}`,
      key: `d_${obj.id}`,
      render: (val) => (
        <span style={{ fontWeight: val === 0 ? 'normal' : 600, color: val === 0 ? '#bfbfbf' : '#262626' }}>
          {val.toFixed(4)}
        </span>
      )
    }))
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Лабораторна робота №1</Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Тема: Обчислення мір близькості для числових даних. Варіант 1.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {/* Task 1 Panel */}
        <Col xs={24} lg={12}>
          <Card 
            title={<><CalculatorOutlined /> Завдання 1: Розрахунок 5 мір близькості</>}
            hoverable
            style={{ height: '100%' }}
          >
            <Paragraph>
              Зміна координат у таблиці нижче автоматично перераховує всі міри близькості між об'єктами.
            </Paragraph>
            <Table
              dataSource={t1Objects}
              columns={t1Columns}
              pagination={false}
              rowKey="id"
              size="small"
              bordered
              style={{ marginBottom: 24 }}
            />

            <Divider>Параметри пікової відстані</Divider>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text type="secondary">Параметр p (степінь різниці):</Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={p}
                    onChange={(val) => updateLab1Task1Params('p', val)}
                    style={{ width: '100%' }}
                  />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text type="secondary">Параметр r (корінь степені):</Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={r}
                    onChange={(val) => updateLab1Task1Params('r', val)}
                    style={{ width: '100%' }}
                  />
                </Space>
              </Col>
            </Row>

            <Divider>Результати та математичний розпис</Divider>
            <Space direction="vertical" style={{ width: '100%', gap: 16 }}>
              {/* Formula and Step Breakdown */}
              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Вхідна різниця по координатах:</div>
                <div>Δx₁ = {obj5.x1} - {obj7.x1} = <b>{dx1}</b> (модуль: {absDx1})</div>
                <div>Δx₂ = {obj5.x2} - {obj7.x2} = <b>{dx2}</b> (модуль: {absDx2})</div>
              </div>

              {/* Euclidean */}
              <Card size="small" type="inner" title="1. Відстань Евкліда">
                <div style={{ fontFamily: 'monospace', marginBottom: 8 }}>
                  d_E = √((x₁₁ - x₂₁)² + (x₁₂ - x₂₂)²)
                </div>
                <div>
                  Обчислення: √(({dx1})² + ({dx2})²) = √({dx1 * dx1} + {dx2 * dx2}) = √({squaredEuclidean}) = 
                  <Text type="success" strong style={{ fontSize: 16, marginLeft: 8 }}>
                    {euclidean.toFixed(4)}
                  </Text>
                </div>
              </Card>

              {/* Squared Euclidean */}
              <Card size="small" type="inner" title="2. Квадрат відстані Евкліда">
                <div style={{ fontFamily: 'monospace', marginBottom: 8 }}>
                  d_E² = (x₁₁ - x₂₁)² + (x₁₂ - x₂₂)²
                </div>
                <div>
                  Обчислення: ({dx1})² + ({dx2})² = {dx1 * dx1} + {dx2 * dx2} = 
                  <Text type="success" strong style={{ fontSize: 16, marginLeft: 8 }}>
                    {squaredEuclidean.toFixed(4)}
                  </Text>
                </div>
              </Card>

              {/* Manhattan */}
              <Card size="small" type="inner" title="3. Манхеттенська відстань">
                <div style={{ fontFamily: 'monospace', marginBottom: 8 }}>
                  d_M = |x₁₁ - x₂₁| + |x₁₂ - x₂₂|
                </div>
                <div>
                  Обчислення: |{dx1}| + |{dx2}| = {absDx1} + {absDx2} = 
                  <Text type="success" strong style={{ fontSize: 16, marginLeft: 8 }}>
                    {manhattan.toFixed(4)}
                  </Text>
                </div>
              </Card>

              {/* Chebyshev */}
              <Card size="small" type="inner" title="4. Відстань Чебишева">
                <div style={{ fontFamily: 'monospace', marginBottom: 8 }}>
                  d_Ch = max(|x₁₁ - x₂₁|, |x₁₂ - x₂₂|)
                </div>
                <div>
                  Обчислення: max(|{dx1}|, |{dx2}|) = max({absDx1}, {absDx2}) = 
                  <Text type="success" strong style={{ fontSize: 16, marginLeft: 8 }}>
                    {chebyshev.toFixed(4)}
                  </Text>
                </div>
              </Card>

              {/* Power Distance */}
              <Card size="small" type="inner" title={`5. Пікова відстань (Параметри: p=${p}, r=${r})`}>
                <div style={{ fontFamily: 'monospace', marginBottom: 8 }}>
                  d_P = (|x₁₁ - x₂₁|^p + |x₁₂ - x₂₂|^p)^(1/r)
                </div>
                <div>
                  Обчислення: (|{dx1}|^{p} + |{dx2}|^{p})^(1/{r}) = ({Math.pow(absDx1, p).toFixed(2)} + {Math.pow(absDx2, p).toFixed(2)})^(1/{r}) = 
                  <Text type="success" strong style={{ fontSize: 16, marginLeft: 8 }}>
                    {powerDistance.toFixed(4)}
                  </Text>
                </div>
              </Card>
            </Space>
          </Card>
        </Col>

        {/* Task 2 Panel */}
        <Col xs={24} lg={12}>
          <Card 
            title={<><TableOutlined /> Завдання 2: Симетрична квадратна матриця відстаней</>}
            hoverable
            style={{ height: '100%' }}
          >
            <Paragraph>
              Побудова симетричної квадратної матриці відстаней з нулями на головній діагоналі для чотирьох об'єктів (1, 2, 3, 8). Метрика: <b>Відстань Евкліда</b>.
            </Paragraph>
            
            <div style={{ marginBottom: 20 }}>
              <Text strong style={{ display: 'block', marginBottom: 10 }}>
                1. Вхідні координати об'єктів (редагуйте значення для динамічного перерахунку):
              </Text>
              <Table
                dataSource={t2Objects}
                columns={t2CoordsColumns}
                pagination={false}
                rowKey="id"
                size="small"
                bordered
              />
            </div>

            <Divider />

            <div>
              <Text strong style={{ display: 'block', marginBottom: 10 }}>
                2. Отримана матриця відстаней:
              </Text>
              <Table
                dataSource={matrixData}
                columns={matrixColumns}
                pagination={false}
                size="middle"
                bordered
                scroll={{ x: 'max-content' }}
                style={{ background: '#fafafa' }}
              />
            </div>

            <div style={{ marginTop: 24, background: '#e6f7ff', padding: 16, borderRadius: 8, display: 'flex', gap: 12 }}>
              <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 18, marginTop: 2 }} />
              <div>
                <Text strong>Властивості матриці відстаней:</Text>
                <ul style={{ paddingLeft: 20, margin: '8px 0 0 0', color: '#595959' }}>
                  <li><b>Симетричність:</b> Відстань від A до B дорівнює відстані від B до A ($d_{ij} = d_{ji}$).</li>
                  <li><b>Головна діагональ:</b> Нулі на діагоналі, оскільки відстань від об'єкта до самого себе дорівнює нулю ($d_{ii} = 0$).</li>
                  <li><b>Невід'ємність:</b> Всі елементи матриці невід'ємні ($d_{ij} \ge 0$).</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
