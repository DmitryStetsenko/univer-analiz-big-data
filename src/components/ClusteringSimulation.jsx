import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Table, Card, Button, Slider, Typography, Row, Col, Divider, Space, Tag, InputNumber, Alert, Collapse } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, LeftOutlined, RightOutlined, RedoOutlined, EditOutlined, InfoCircleOutlined, CalculatorOutlined } from '@ant-design/icons';
import { Dendrogram } from './Dendrogram';

const { Title, Text, Paragraph } = Typography;

export const ClusteringSimulation = ({ method = 'single' }) => {
  const { labsData, updateLabsObject, setStepIndex, nextStep, prevStep } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef(null);

  const methodKey = method === 'single' ? 'singleLinkage' : 'completeLinkage';
  const { steps, dendrogram, currentStepIndex } = labsData[methodKey];
  const { objects } = labsData;

  // Handle Play/Pause simulation
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        const nextIdx = currentStepIndex + 1;
        if (nextIdx < steps.length) {
          setStepIndex(method, nextIdx);
        } else {
          setIsPlaying(false);
        }
      }, 2000); // Step every 2 seconds
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, method, setStepIndex]);

  const togglePlay = () => {
    if (currentStepIndex === steps.length - 1 && !isPlaying) {
      // Loop back to start if finished
      setStepIndex(method, 0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(method, 0);
  };

  // Coordinates Table Columns
  const coordColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: (text) => <Tag color="blue">Об'єкт {text}</Tag>
    },
    {
      title: 'x (Обсяг продукції)',
      dataIndex: 'x',
      key: 'x',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLabsObject(index, 'x', val)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'y (Вартість фондів)',
      dataIndex: 'y',
      key: 'y',
      render: (value, record, index) => (
        <InputNumber
          value={value}
          onChange={(val) => updateLabsObject(index, 'y', val)}
          style={{ width: '100%' }}
        />
      )
    }
  ];

  // Prepare Distance Matrix table data for the current step
  const currentStep = steps[currentStepIndex] || steps[0];
  const matrixLabels = currentStep.labels;
  const matrixData = currentStep.matrix.map((row, rIdx) => {
    const rowLabel = matrixLabels[rIdx];
    const rowObj = { key: rowLabel, label: rowLabel };
    matrixLabels.forEach((colLabel, cIdx) => {
      rowObj[colLabel] = row[cIdx];
    });
    return rowObj;
  });

  // Check if cell is the next merge pair
  const isMergingPair = (lbl1, lbl2) => {
    // Look at the next step to see what gets merged
    const nextStepObj = steps[currentStepIndex + 1];
    if (!nextStepObj || !nextStepObj.merged) return false;
    const [m1, m2] = nextStepObj.merged;
    return (lbl1 === m1 && lbl2 === m2) || (lbl1 === m2 && lbl2 === m1);
  };

  const matrixColumns = [
    {
      title: '',
      dataIndex: 'label',
      key: 'label',
      fixed: 'left',
      width: 110,
      render: (text) => <b style={{ color: '#722ed1' }}>{text}</b>
    },
    ...matrixLabels.map(label => ({
      title: label,
      dataIndex: label,
      key: label,
      render: (val, record) => {
        const rowLabel = record.label;
        const colLabel = label;
        const isSelf = rowLabel === colLabel;
        const isNextMerge = isMergingPair(rowLabel, colLabel);

        let cellStyle = { fontWeight: 500 };
        if (isSelf) {
          cellStyle.color = '#bfbfbf';
        } else if (isNextMerge) {
          cellStyle.background = '#f9f0ff';
          cellStyle.color = '#722ed1';
          cellStyle.fontWeight = 700;
          cellStyle.border = '1px solid #d3adf7';
        }

        return (
          <div style={{ padding: '4px 8px', borderRadius: 4, ...cellStyle }}>
            {val.toFixed(4)}
          </div>
        );
      }
    }))
  ];

  // Explanation text
  const stepMergeInfo = steps[currentStepIndex + 1]?.merged;
  const stepMergeDist = steps[currentStepIndex + 1]?.mergeDistance;

  const theoryItems = [
    {
      key: 'overview',
      label: <span style={{ fontWeight: 600 }}><InfoCircleOutlined style={{ color: '#1677ff', marginRight: 8 }} /> Що відбувається в процесі ієрархічної кластеризації?</span>,
      children: (
        <div>
          <Paragraph>
            <b>Ієрархічна агломеративна кластеризація</b> — це послідовне об'єднання окремих об'єктів у більші групи (кластери) на основі міри їхньої близькості (найменшої відстані).
          </Paragraph>
          <Paragraph>
            Процес виконується покроково:
          </Paragraph>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            <li style={{ marginBottom: 6 }}>
              <b>Крок 0 (Початковий стан):</b> Кожен окремий об'єкт розглядається як власний одноелементний кластер. Будується первинна матриця відстаней між усіма парами об'єктів.
            </li>
            <li style={{ marginBottom: 6 }}>
              <b>Подальші кроки (Об'єднання):</b> На кожному етапі знаходяться два найближчі кластери та об'єднуються в один новий спільний кластер (вони підсвічені у матриці рожевим).
            </li>
            <li style={{ marginBottom: 6 }}>
              <b>Перерахунок відстаней:</b> Відстані від нового об'єднаного кластера до решти наявних кластерів перераховуються відповідно до обраного методу зв'язку.
            </li>
            <li style={{ marginBottom: 0 }}>
              <b>Результат (Дендрограма):</b> Об'єднання триває, доки всі об'єкти не стануть одним загальним кластером. Послідовність та відстані злиття відображаються у вигляді дерева — <b>дендрограми</b>.
            </li>
          </ul>
          <Paragraph style={{ marginBottom: 0 }}>
            Головна відмінність між методами: <b>метод найближчого сусіда</b> (одиночний зв'язок) шукає <i>мінімальну</i> відстань між точками двох кластерів, тоді як <b>метод найдальшого сусіда</b> (повний зв'язок) орієнтується на <i>максимальну</i> відстань між ними.
          </Paragraph>
        </div>
      )
    },
    {
      key: 'variables',
      label: <span style={{ fontWeight: 600 }}><CalculatorOutlined style={{ color: '#722ed1', marginRight: 8 }} /> Пояснення змінних та позначень</span>,
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#1677ff' }}>Вхідні координати об'єктів:</div>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 6 }}>
                <b>Об'єкт (ID)</b> — підприємство, яке бере участь у групуванні.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>x (Обсяг продукції)</b> — перша координата об'єкта, що відображає випуск продукції підприємства (млн грн).
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>y (Вартість фондів)</b> — друга координата об'єкта, що відображає середньорічну вартість основних фондів підприємства (млн грн).
              </li>
              <li style={{ marginBottom: 0 }}>
                Координати можна редагувати у таблиці ліворуч, щоб спостерігати за автоматичною зміною структури кластерів та форми дендрограми.
              </li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#722ed1' }}>Параметри алгоритму та метрики:</div>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li style={{ marginBottom: 6 }}>
                <b>Матриця відстаней (Distance Matrix)</b> — таблиця попарних відстаней між усіма діючими кластерами на поточному кроці.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>Крок (Step Index)</b> — номер ітерації. Для <i>N</i> об'єктів виконується рівно <i>N - 1</i> кроків злиття.
              </li>
              <li style={{ marginBottom: 6 }}>
                <b>Коефіцієнт об'єднання (Merge Distance)</b> — відстань між парою найближчих кластерів у момент їх злиття. Відображає ступінь неоднорідності об'єднаного кластера.
              </li>
              <li style={{ marginBottom: 0 }}>
                <b>Дендрограма (Dendrogram)</b> — ієрархічне дерево, де рівні злиття (висота горизонтальних ліній) відповідають коефіцієнтам об'єднання.
              </li>
            </ul>
          </Col>
        </Row>
      )
    }
  ];

  return (
    <div>
      <Collapse 
        items={theoryItems} 
        style={{ marginBottom: 24, background: '#ffffff', borderRadius: 8, border: '1px solid #d9d9d9' }}
      />
      <Row gutter={[24, 24]}>
        {/* Left column: Coordinate Editor and Theory card */}
        <Col xs={24} lg={8}>
          <Card 
            title={<><EditOutlined /> Вхідні дані (Об'єкти)</>}
            style={{ marginBottom: 24 }}
          >
            <Paragraph>
              Змініть координати об'єктів для автоматичного перерахунку всієї ієрархічної кластеризації.
            </Paragraph>
            <Table
              dataSource={objects}
              columns={coordColumns}
              pagination={false}
              size="small"
              bordered
              rowKey="id"
            />
          </Card>

          <Card title="Метод зв'язку">
            {method === 'single' ? (
              <div>
                <Tag color="blue" style={{ marginBottom: 12 }}>Метод найближчого сусіда (Одиночний зв'язок)</Tag>
                <Paragraph>
                  Відстань між двома кластерами визначається як <b>мінімальна</b> відстань між об'єктами цих кластерів:
                </Paragraph>
                <div style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: 8, borderRadius: 4, marginBottom: 12, textAlign: 'center' }}>
                  D(A, B) = min 	{"{"} d(a, b) : a ∈ A, b ∈ B {"}"}
                </div>
                <Paragraph style={{ fontSize: 13, color: '#8c8c8c' }}>
                  При об'єднанні двох стовпців/рядків у нову групу, кожна нова відстань до іншого кластера розраховується як:
                  <br />
                  <b>d(k, (i,j)) = min(d(k,i), d(k,j))</b>
                </Paragraph>
              </div>
            ) : (
              <div>
                <Tag color="purple" style={{ marginBottom: 12 }}>Метод найдальшого сусіда (Повний зв'язок)</Tag>
                <Paragraph>
                  Відстань між двома кластерами визначається як <b>максимальна</b> відстань між об'єктами цих кластерів:
                </Paragraph>
                <div style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: 8, borderRadius: 4, marginBottom: 12, textAlign: 'center' }}>
                  D(A, B) = max 	{"{"} d(a, b) : a ∈ A, b ∈ B {"}"}
                </div>
                <Paragraph style={{ fontSize: 13, color: '#8c8c8c' }}>
                  При об'єднанні двох стовпців/рядків у нову групу, кожна нова відстань до іншого кластера розраховується як:
                  <br />
                  <b>d(k, (i,j)) = max(d(k,i), d(k,j))</b>
                </Paragraph>
              </div>
            )}
          </Card>
        </Col>

        {/* Right column: Simulation, Matrix and Dendrogram */}
        <Col xs={24} lg={16}>
          <Card title="Покроковий симулятор кластеризації">
            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <Space>
                <Button 
                  icon={<LeftOutlined />} 
                  onClick={() => prevStep(method)} 
                  disabled={currentStepIndex === 0 || isPlaying}
                >
                  Назад
                </Button>
                <Button
                  type={isPlaying ? 'default' : 'primary'}
                  icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  onClick={togglePlay}
                >
                  {isPlaying ? 'Пауза' : 'Грати'}
                </Button>
                <Button 
                  icon={<RightOutlined />} 
                  onClick={() => nextStep(method)} 
                  disabled={currentStepIndex === steps.length - 1 || isPlaying}
                >
                  Вперед
                </Button>
                <Button 
                  icon={<RedoOutlined />} 
                  onClick={handleReset}
                  disabled={isPlaying}
                >
                  Скинути
                </Button>
              </Space>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text strong>Крок:</Text>
                <Slider
                  min={0}
                  max={steps.length - 1}
                  value={currentStepIndex}
                  onChange={(val) => setStepIndex(method, val)}
                  style={{ width: 120, margin: '0 10px' }}
                  disabled={isPlaying}
                />
                <Tag color="purple" style={{ fontSize: 14, padding: '2px 8px' }}>
                  {currentStepIndex} / {steps.length - 1}
                </Tag>
              </div>
            </div>

            {/* Current Step Description Alert */}
            {currentStepIndex === 0 ? (
              <Alert
                title="Початковий стан"
                description="Всі об'єкти знаходяться в окремих одноелементних кластерах. Матриця відображає попарні Евклідові відстані. Осередки з рожевим підсвічуванням вказують на найближчу пару кластерів, яка буде об'єднана на наступному кроці."
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />
            ) : (
              <Alert
                title={`Крок ${currentStepIndex}: Об'єднання кластерів`}
                description={
                  <div>
                    На цьому кроці було об'єднано кластери: <b>{steps[currentStepIndex].merged?.join(' та ')}</b>. 
                    <br />
                    Відстань об'єднання: <b>{steps[currentStepIndex].mergeDistance.toFixed(4)}</b>.
                    {currentStepIndex < steps.length - 1 && (
                      <div style={{ marginTop: 8 }}>
                        На наступному кроці об'єднаються кластери: <b>{steps[currentStepIndex + 1].merged?.join(' та ')}</b> (підсвічено рожевим у таблиці).
                      </div>
                    )}
                  </div>
                }
                type="success"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}

            {/* Matrix title */}
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ fontSize: 16 }}>
                Матриця відстаней (Розмір: {matrixLabels.length} × {matrixLabels.length})
              </Text>
            </div>
            
            <Table
              dataSource={matrixData}
              columns={matrixColumns}
              pagination={false}
              size="middle"
              bordered
              scroll={{ x: 'max-content' }}
              style={{ marginBottom: 32 }}
            />

            <Divider>Дендрограма об'єднання кластерів</Divider>
            
            <Dendrogram tree={dendrogram} method={method} width={600} height={320} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
