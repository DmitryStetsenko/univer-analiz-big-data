import React from 'react';
import { useStore } from '../store/useStore';
import { Table, Card, InputNumber, Row, Col, Typography, Divider, Space, Tag, Button, Collapse } from 'antd';
import { calculateDistanceByMetric } from '../utils/clustering';
import { CalculatorOutlined, InfoCircleOutlined, TableOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const Lab1 = () => {
  const { currentVariant, lab1Data, updateLab1Task1Object, updateLab1Task1Params, updateLab1Task2Object } = useStore();

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
        row[`d_${t2Objects[j].id}`] = calculateDistanceByMetric(t2Objects[i], t2Objects[j], lab1Data.task2.metric, ['x1', 'x2']);
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

  const theoryItems = [
    {
      key: 'overview',
      label: <span style={{ fontWeight: 600 }}><InfoCircleOutlined style={{ color: '#1677ff', marginRight: 8 }} /> Що відбувається в цій лабораторній роботі?</span>,
      children: (
        <div>
          <Paragraph>
            Ця лабораторна робота присвячена вивченню та практичному розрахунку <b>мір близькості (відстаней)</b> між об'єктами з числовими характеристиками. Обчислення відстані є фундаментальним кроком для багатьох алгоритмів аналізу даних та машинного навчання (наприклад, для методів кластеризації чи класифікації k-NN).
          </Paragraph>
          <Paragraph>
            <b>Завдання 1:</b> Демонструє розрахунок 5 різних метрик відстані між двома об'єктами (за варіантом: Об'єкт {obj5.id} та Об'єкт {obj7.id}). Ви можете змінювати значення параметрів X1 та X2 у таблиці нижче, щоб побачити, як змінюються попарні відстані та формульний розпис у реальному часі.
          </Paragraph>
          <Paragraph style={{ marginBottom: 0 }}>
            <b>Завдання 2:</b> Показує побудову <b>симетричної квадратної матриці відстаней</b> для чотирьох об'єктів. Матриця відображає відстані між усіма парами об'єктів. Головна діагональ складається з нулів (відстань від об'єкта до себе), а сама матриця є симетричною відносно діагоналі.
          </Paragraph>
        </div>
      )
    },
    {
      key: 'variables',
      label: <span style={{ fontWeight: 600 }}><CalculatorOutlined style={{ color: '#722ed1', marginRight: 8 }} /> Опис змінних та показників</span>,
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#1677ff' }}>Вхідні змінні та параметри:</div>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 6 }}>
                <b>Об'єкт (ID)</b> — експериментальна сутність, що аналізується (наприклад, точка у просторі ознак).
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>Параметр X1 / X2 (Координати)</b> — числові ознаки, що описують властивості об'єкта та визначають його положення на координатній площині.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>Δx₁ / Δx₂</b> — різниця координат об'єктів уздовж відповідних осей X1 та X2.
              </li>
              <li style={{ marginBottom: 0 }}>
                <b>p та r</b> — параметри степеневої відстані (відстані Мінковського). <b>p</b> вказує ступінь піднесення різниць координат, а <b>r</b> визначає ступінь кореня.
              </li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#722ed1' }}>Метрики відстані (Результати):</div>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 6 }}>
                <b>d_E (Евклідова відстань)</b> — звичайна лінійна відстань між двома точками по прямій.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>d_E² (Квадрат Евклідової відстані)</b> — відстань Евкліда без добування квадратного кореня. Надає прогресуючу вагу більшим відмінностям.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>d_M (Манхеттенська відстань)</b> — відстань, що розраховується як сума абсолютних різниць координат (рух сіткою, як у таксі).
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>d_Ch (Відстань Чебишева)</b> — визначається за найбільшою різницею серед усіх координат.
              </li>
              <li style={{ marginBottom: 0 }}>
                <b>d_P (Степенева відстань)</b> — узагальнена метрика, яка дозволяє налаштовувати чутливість шляхом регулювання ступенів <i>p</i> та <i>r</i>.
              </li>
            </ul>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Лабораторна робота №1</Title>
          <Paragraph style={{ color: '#8c8c8c', margin: '4px 0 0 0' }}>
            Тема: Обчислення мір близькості для числових даних. Варіант {currentVariant}.
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<ExperimentOutlined />} 
          href="#/practical?tab=recommendations"
          style={{ background: 'linear-gradient(90deg, #1677ff, #722ed1)', border: 'none', borderRadius: 6 }}
        >
          Дивитись практичне застосування
        </Button>
      </div>

      <Collapse 
        items={theoryItems} 
        style={{ marginBottom: 24, background: '#ffffff', borderRadius: 8, border: '1px solid #d9d9d9' }}
      />

      <Row gutter={[24, 24]}>
        {/* Task 1 Panel */}
        <Col xs={24} lg={12}>
          <Card 
            title={<><CalculatorOutlined /> Завдання 1: Розрахунок 5 мір близькості (Об'єкти {obj5.id} та {obj7.id})</>}
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
                <Space orientation="vertical" style={{ width: '100%' }}>
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
                <Space orientation="vertical" style={{ width: '100%' }}>
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
            <Space orientation="vertical" style={{ width: '100%', gap: 16 }}>
              {/* Formula and Step Breakdown */}
              <div style={{ background: '#fafafa', padding: 16, borderRadius: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Вхідна різниця по координатах:</div>
                <div>Δx₁ (Об'єкт {obj5.id} - Об'єкт {obj7.id}) = {obj5.x1} - {obj7.x1} = <b>{dx1}</b> (модуль: {absDx1})</div>
                <div>Δx₂ (Об'єкт {obj5.id} - Об'єкт {obj7.id}) = {obj5.x2} - {obj7.x2} = <b>{dx2}</b> (модуль: {absDx2})</div>
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
              Побудова симетричної квадратної матриці відстаней з нулями на головній діагоналі для чотирьох об'єктів ({t2Objects.map(o => o.id).join(', ')}). Метрика: <b>{lab1Data.task2.metric === 'Euclidean' ? 'Відстань Евкліда' : lab1Data.task2.metric === 'Squared Euclidean' ? 'Квадрат відстані Евкліда' : lab1Data.task2.metric === 'Manhattan' ? 'Манхеттенська відстань' : lab1Data.task2.metric === 'Chebyshev' ? 'Відстань Чебишева' : 'Пікова відстань'}</b>.
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
                  <li><b>Симетричність:</b> Відстань від A до B дорівнює відстані від B до A (d<sub>ij</sub> = d<sub>ji</sub>).</li>
                  <li><b>Головна діагональ:</b> Нулі на діагоналі, оскільки відстань від об'єкта до самого себе дорівнює нулю (d<sub>ii</sub> = 0).</li>
                  <li><b>Невід'ємність:</b> Всі елементи матриці невід'ємні (d<sub>ij</sub> ≥ 0).</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
