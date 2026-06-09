import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Tabs, Slider, Row, Col, Typography, Space, Tag, Alert, Button, Table, Divider, Segmented } from 'antd';
import { 
  ExperimentOutlined, 
  UserOutlined, 
  PlayCircleOutlined, 
  StarOutlined, 
  RocketOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  WarningOutlined,
  ReadOutlined,
  DashboardOutlined,
  CompassOutlined
} from '@ant-design/icons';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const { Title, Paragraph, Text } = Typography;

export const PracticalApplication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'recommendations';

  const handleTabChange = (key) => {
    setSearchParams({ tab: key });
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ExperimentOutlined style={{ color: '#1677ff' }} />
          Практичне застосування алгоритмів
        </Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Дізнайтеся, як міри близькості та алгоритми ієрархічної кластеризації застосовуються в реальних бізнес-кейсах та ІТ-індустрії.
        </Paragraph>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="card"
        items={[
          {
            key: 'recommendations',
            label: (
              <span>
                <PlayCircleOutlined /> Міри відстаней (3 Кейси)
              </span>
            ),
            children: <DistanceMetricsCases />
          },
          {
            key: 'segmentation',
            label: (
              <span>
                <LineChartOutlined /> Кластеризація (3 Кейси)
              </span>
            ),
            children: <ClusteringCases />
          }
        ]}
      />
    </div>
  );
};

// ==========================================
// === SECTION 1: DISTANCE METRICS CASES ===
// ==========================================
const DistanceMetricsCases = () => {
  const [activeCase, setActiveCase] = useState('movies');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, color: '#595959' }}>Оберіть практичний кейс:</span>
        <Segmented
          value={activeCase}
          onChange={setActiveCase}
          options={[
            { label: 'Рекомендації фільмів', value: 'movies', icon: <PlayCircleOutlined /> },
            { label: 'Медична діагностика (KNN)', value: 'medical', icon: <MedicineBoxOutlined /> },
            { label: 'Антифрод (Банкінг)', value: 'fraud', icon: <WarningOutlined /> }
          ]}
        />
      </div>

      {activeCase === 'movies' && <MovieRecommendationDemo />}
      {activeCase === 'medical' && <MedicalDiagnosisDemo />}
      {activeCase === 'fraud' && <FraudDetectionDemo />}
    </Space>
  );
};

// --- CASE 1: MOVIES ---
const MovieRecommendationDemo = () => {
  const [myRatings, setMyRatings] = useState({ interstellar: 4, matrix: 4, lalaland: 1 });
  const [metric, setMetric] = useState('Euclidean');

  const users = [
    { name: 'Олексій (Фанат Sci-Fi)', ratings: { interstellar: 5, matrix: 5, lalaland: 2, tenet: 5 }, color: '#1890ff' },
    { name: 'Марія (Фанат мелодрам)', ratings: { interstellar: 2, matrix: 1, lalaland: 5, tenet: 1 }, color: '#eb2f96' },
    { name: 'Дмитро (Універсал)', ratings: { interstellar: 4, matrix: 3, lalaland: 4, tenet: 4 }, color: '#fa8c16' }
  ];

  const calculateDistance = (otherUser, selectedMetric) => {
    const d1 = myRatings.interstellar - otherUser.ratings.interstellar;
    const d2 = myRatings.matrix - otherUser.ratings.matrix;
    const d3 = myRatings.lalaland - otherUser.ratings.lalaland;
    const absD1 = Math.abs(d1);
    const absD2 = Math.abs(d2);
    const absD3 = Math.abs(d3);

    switch (selectedMetric) {
      case 'Euclidean': return Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
      case 'Squared Euclidean': return d1 * d1 + d2 * d2 + d3 * d3;
      case 'Manhattan': return absD1 + absD2 + absD3;
      case 'Chebyshev': return Math.max(absD1, absD2, absD3);
      default: return Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
    }
  };

  const computedDistances = users.map(user => ({
    ...user,
    distance: calculateDistance(user, metric)
  }));

  let closestUser = computedDistances[0];
  computedDistances.forEach(u => {
    if (u.distance < closestUser.distance) closestUser = u;
  });

  const columns = [
    { title: 'Користувач', dataIndex: 'name', key: 'name', render: (text, record) => <Text style={{ color: record.color }} strong>{text}</Text> },
    { title: 'Інтерстеллар', dataIndex: ['ratings', 'interstellar'], key: 'interstellar', render: (r) => <><StarOutlined style={{ color: '#fadb14' }} /> {r}</> },
    { title: 'Матриця', dataIndex: ['ratings', 'matrix'], key: 'matrix', render: (r) => <><StarOutlined style={{ color: '#fadb14' }} /> {r}</> },
    { title: 'Ла-Ла Ленд', dataIndex: ['ratings', 'lalaland'], key: 'lalaland', render: (r) => <><StarOutlined style={{ color: '#fadb14' }} /> {r}</> },
    { title: `Відстань (${metric})`, dataIndex: 'distance', key: 'distance', render: (d, record) => (
      <Tag color={record.name === closestUser.name ? 'success' : 'default'} style={{ fontSize: 13 }}>
        {d.toFixed(3)}
      </Tag>
    )}
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><PlayCircleOutlined /> Рекомендації фільмів на основі відстані смаків</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#e6f7ff', borderLeft: '4px solid #1677ff' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#0050b3' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Це класичний приклад **колаборативної фільтрації (Collaborative Filtering)**, яка лежить в основі рекомендацій Netflix, Spotify та Amazon. 
            Замість аналізу вмісту (наприклад, жанрів), система шукає людей зі схожою історією поведінки.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це рахує математика:</b> Кожен користувач представляється точкою у багатовимірному просторі, де осі координат — це оцінки фільмів. 
            Змінюючи повзунки, ви переміщуєте свій профіль у просторі оцінок. Формула відстані Евкліда рахує пряму геометричну відстань між вами та іншими користувачами: 
            <i> d = √((Ваш_Рейтинг1 - Їх_Рейтинг1)² + ...)</i>. Людина з найменшою дистанцією стає вашим «найближчим сусідом», і фільми, які вона вподобала, але які ви ще не бачили, радяться вам.
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title="Ваші оцінки" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Інтерстеллар</Text><Tag color="blue">{myRatings.interstellar} ★</Tag></div>
                <Slider min={1} max={5} value={myRatings.interstellar} onChange={(v) => setMyRatings({...myRatings, interstellar: v})} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Матриця</Text><Tag color="blue">{myRatings.matrix} ★</Tag></div>
                <Slider min={1} max={5} value={myRatings.matrix} onChange={(v) => setMyRatings({...myRatings, matrix: v})} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Ла-Ла Ленд</Text><Tag color="pink">{myRatings.lalaland} ★</Tag></div>
                <Slider min={1} max={5} value={myRatings.lalaland} onChange={(v) => setMyRatings({...myRatings, lalaland: v})} />
              </div>
            </Space>

            <Divider style={{ margin: '16px 0' }} />
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Оберіть міру близькості:</Text>
            <Space wrap>
              {['Euclidean', 'Squared Euclidean', 'Manhattan', 'Chebyshev'].map(m => (
                <Button key={m} type={metric === m ? 'primary' : 'default'} size="small" onClick={() => setMetric(m)}>
                  {m === 'Euclidean' ? 'Евклід' : m === 'Squared Euclidean' ? 'Кв. Евкліда' : m === 'Manhattan' ? 'Манхеттен' : 'Чебишев'}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Table dataSource={computedDistances} columns={columns} pagination={false} rowKey="name" size="small" bordered />
            <Alert
              message={<span style={{ fontSize: 16, fontWeight: 700 }}><RocketOutlined /> Рекомендація на вечір</span>
              }
              description={
                <div style={{ marginTop: 8 }}>
                  <Paragraph style={{ fontSize: 15 }}>Рекомендуємо переглянути: <b style={{ color: '#1890ff' }}>Тенет (Tenet)</b></Paragraph>
                  <Paragraph type="secondary">Оскільки ваш найближчий сусід за смаками — <b>{closestUser.name}</b> (відстань: {closestUser.distance.toFixed(2)}) поставив цьому фільму <b>{closestUser.ratings.tenet}★</b>.</Paragraph>
                </div>
              }
              type="info"
              style={{ borderLeft: '5px solid #1890ff', background: '#e6f7ff' }}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

// --- CASE 2: MEDICAL DIAGNOSIS (KNN) ---
const MedicalDiagnosisDemo = () => {
  const [patientData, setPatientData] = useState({ temp: 37.5, bp: 135 });
  const [metric, setMetric] = useState('Euclidean');

  // Database of 4 historical diagnosed cases
  const historicalPatients = [
    { id: 1, name: 'Іван', temp: 36.6, bp: 120, diagnosis: 'Здоровий', color: '#52c41a' },
    { id: 2, name: 'Марія', temp: 38.8, bp: 115, diagnosis: 'Грип', color: '#ff4d4f' },
    { id: 3, name: 'Петро', temp: 37.0, bp: 165, diagnosis: 'Гіпертонія', color: '#fa8c16' },
    { id: 4, name: 'Анна', temp: 39.2, bp: 120, diagnosis: 'Грип', color: '#ff4d4f' }
  ];

  // Calculate distance
  const calculateDistance = (p, selectedMetric) => {
    // Normalization to prevent Blood Pressure (large values) from completely dominating Temperature (small values)
    // We normalize temp by dividing by 36.6, and bp by dividing by 120 (simple scale adjustment)
    const dTemp = (patientData.temp - p.temp) * 10; // Multiply by 10 to give temp changes more weight
    const dBp = patientData.bp - p.bp;
    const absTemp = Math.abs(dTemp);
    const absBp = Math.abs(dBp);

    switch (selectedMetric) {
      case 'Euclidean': return Math.sqrt(dTemp * dTemp + dBp * dBp);
      case 'Squared Euclidean': return dTemp * dTemp + dBp * dBp;
      case 'Manhattan': return absTemp + absBp;
      case 'Chebyshev': return Math.max(absTemp, absBp);
      default: return Math.sqrt(dTemp * dTemp + dBp * dBp);
    }
  };

  const computedPatients = historicalPatients.map(p => ({
    ...p,
    distance: calculateDistance(p, metric)
  })).sort((a, b) => a.distance - b.distance);

  const closest = computedPatients[0];

  const columns = [
    { title: 'Історичний пацієнт', dataIndex: 'name', key: 'name' },
    { title: 'Температура (°C)', dataIndex: 'temp', key: 'temp' },
    { title: 'Тиск (мм рт.ст.)', dataIndex: 'bp', key: 'bp' },
    { title: 'Діагноз', dataIndex: 'diagnosis', key: 'diagnosis', render: (text, record) => <Tag color={record.color}>{text}</Tag> },
    { title: 'Математична відстань', dataIndex: 'distance', key: 'distance', render: (d, record) => (
      <Tag color={record.id === closest.id ? 'green' : 'default'}>{d.toFixed(2)}</Tag>
    )}
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><MedicineBoxOutlined /> Медична класифікація пацієнтів (Метод K-Найближчих Сусідів)</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#fffbe6', borderLeft: '4px solid #faad14' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#ad6800' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Це приклад **KNN (K-Nearest Neighbors)** — одного з найпростіших та найефективніших алгоритмів машинного навчання для медичної класифікації.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це працює:</b> Новий пацієнт приходить із певними симптомами (температура та тиск). Алгоритм порівнює його показники з базою даних людей, які вже пройшли обстеження та мають підтверджений діагноз. 
            Оскільки масштаб тиску (до 200) набагато більший за масштаб температури (близько 36-40), ми застосовуємо <i>вагове нормування</i> (множимо різницю температур на 10), щоб обидва параметри рівноцінно впливали на діагноз. 
            Діагноз визначається за більшістю голосів серед `K` найближчих пацієнтів. Тут ми використовуємо `K=1` для наочності (беремо найближчого сусіда).
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title="Показники нового пацієнта" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Температура тіла</Text><Tag color="orange">{patientData.temp} °C</Tag></div>
                <Slider min={35.5} max={41} step={0.1} value={patientData.temp} onChange={(v) => setPatientData({...patientData, temp: v})} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Систолічний тиск</Text><Tag color="red">{patientData.bp} мм</Tag></div>
                <Slider min={90} max={190} step={5} value={patientData.bp} onChange={(v) => setPatientData({...patientData, bp: v})} />
              </div>
            </Space>

            <Divider style={{ margin: '16px 0' }} />
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Оберіть міру близькості:</Text>
            <Space wrap>
              {['Euclidean', 'Squared Euclidean', 'Manhattan', 'Chebyshev'].map(m => (
                <Button key={m} type={metric === m ? 'primary' : 'default'} size="small" onClick={() => setMetric(m)}>
                  {m === 'Euclidean' ? 'Евклід' : m === 'Squared Euclidean' ? 'Кв. Евкліда' : m === 'Manhattan' ? 'Манхеттен' : 'Чебишев'}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Table dataSource={computedPatients} columns={columns} pagination={false} rowKey="id" size="small" bordered />
            <Alert
              message={<span style={{ fontSize: 16, fontWeight: 700 }}><MedicineBoxOutlined style={{ color: '#52c41a' }} /> Попередній діагноз системи</span>}
              description={
                <div style={{ marginTop: 8 }}>
                  <Paragraph style={{ fontSize: 15 }}>Можливий діагноз: <Tag color={closest.color} style={{ fontSize: 15, padding: '2px 8px' }}><b>{closest.diagnosis}</b></Tag></Paragraph>
                  <Paragraph type="secondary">Оскільки новий пацієнт найближче підходить до пацієнта <b>{closest.name}</b> (відстань: {closest.distance.toFixed(2)}), у якого було діагностовано <b>{closest.diagnosis}</b>.</Paragraph>
                </div>
              }
              type="success"
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

// --- CASE 3: CREDIT CARD FRAUD DETECTION ---
const FraudDetectionDemo = () => {
  const [tx, setTx] = useState({ amount: 150, frequency: 3 });
  const [metric, setMetric] = useState('Euclidean');

  // Normal behavior centroid: typical customer spends $45, with frequency 1.5 times/hour
  const normalProfile = { amount: 45, frequency: 1.5 };

  const calculateDistance = (selectedMetric) => {
    const dAmount = tx.amount - normalProfile.amount;
    const dFreq = (tx.frequency - normalProfile.frequency) * 50; // frequency scaled to make it comparable to transaction dollars
    const absAmount = Math.abs(dAmount);
    const absFreq = Math.abs(dFreq);

    switch (selectedMetric) {
      case 'Euclidean': return Math.sqrt(dAmount * dAmount + dFreq * dFreq);
      case 'Squared Euclidean': return dAmount * dAmount + dFreq * dFreq;
      case 'Manhattan': return absAmount + absFreq;
      case 'Chebyshev': return Math.max(absAmount, absFreq);
      default: return Math.sqrt(dAmount * dAmount + dFreq * dFreq);
    }
  };

  const distance = calculateDistance(metric);
  const threshold = 180;
  const isFraud = distance > threshold;

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><WarningOutlined /> Виявлення банківського шахрайства (Fraud Detection)</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#fff2e8', borderLeft: '4px solid #ffbb96' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#d4380d' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Це спрощена модель **детекції аномалій (Anomaly Detection)**, яку використовують платіжні системи Visa, Mastercard та банки для миттєвого блокування картки у разі її викрадення.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це працює:</b> Банк будує «нормальний профіль» власника картки. Наприклад, типовий користувач робить покупки на суму близько $45 зі швидкістю 1-2 операції на годину. 
            Коли проходить нова транзакція, система вираховує відстань між нею та центром нормального профілю. Якщо відстань перевищує критичний поріг (у нашому прикладі: 180), платіж маркується як <b>підозрілий (аномальний)</b>, і транзакція блокується до підтвердження клієнтом.
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <Card title="Параметри поточної транзакції" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Сума транзакції ($)</Text><Tag color="orange">${tx.amount}</Tag></div>
                <Slider min={10} max={600} step={10} value={tx.amount} onChange={(v) => setTx({...tx, amount: v})} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Кількість операцій на годину</Text><Tag color="red">{tx.frequency} транз/год</Tag></div>
                <Slider min={1} max={15} step={1} value={tx.frequency} onChange={(v) => setTx({...tx, frequency: v})} />
              </div>
            </Space>

            <Divider style={{ margin: '16px 0' }} />
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Оберіть міру близькості:</Text>
            <Space wrap>
              {['Euclidean', 'Squared Euclidean', 'Manhattan', 'Chebyshev'].map(m => (
                <Button key={m} type={metric === m ? 'primary' : 'default'} size="small" onClick={() => setMetric(m)}>
                  {m === 'Euclidean' ? 'Евклід' : m === 'Squared Euclidean' ? 'Кв. Евкліда' : m === 'Manhattan' ? 'Манхеттен' : 'Чебишев'}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card bordered={false} style={{ background: '#fff', textAlign: 'center', padding: '16px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Space direction="vertical">
                <Text type="secondary" style={{ fontSize: 14 }}>Математична відстань до «нормальної поведінки»:</Text>
                <Title level={1} style={{ margin: 0, color: isFraud ? '#cf1322' : '#3f8600' }}>
                  {distance.toFixed(2)}
                </Title>
                <Tag color={isFraud ? 'red' : 'green'} style={{ fontSize: 14, padding: '4px 12px' }}>
                  Порогове значення: {threshold}
                </Tag>
              </Space>
            </Card>

            <Alert
              message={isFraud ? <span style={{ fontSize: 16, fontWeight: 700 }}>⚠️ Транзакцію заблоковано</span> : <span style={{ fontSize: 16, fontWeight: 700 }}>✅ Транзакцію схвалено</span>}
              description={
                isFraud 
                  ? "Сума або частота транзакції різко відхиляються від стандартної поведінки клієнта. Відправлено СМС-підтвердження."
                  : "Транзакція знаходиться у межах допустимого радіусу нормальних операцій клієнта."
              }
              type={isFraud ? 'error' : 'success'}
              showIcon
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};


// ==========================================
// === SECTION 2: CLUSTERING CASES ===
// ==========================================
const ClusteringCases = () => {
  const [activeCase, setActiveCase] = useState('retail');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, color: '#595959' }}>Оберіть практичний кейс:</span>
        <Segmented
          value={activeCase}
          onChange={setActiveCase}
          options={[
            { label: 'Сегментація покупців', value: 'retail', icon: <UserOutlined /> },
            { label: 'Групування новин за темами', value: 'news', icon: <ReadOutlined /> },
            { label: 'Екологічний моніторинг', value: 'ecology', icon: <CompassOutlined /> }
          ]}
        />
      </div>

      {activeCase === 'retail' && <CustomerSegmentationDemo />}
      {activeCase === 'news' && <NewsClusteringDemo />}
      {activeCase === 'ecology' && <EcologyMonitoringDemo />}
    </Space>
  );
};

// --- CASE 1: RETAIL ---
const CustomerSegmentationDemo = () => {
  const [isSegmented, setIsSegmented] = useState(false);

  const customers = [
    { id: 1, x: 15, y: 39, label: 'Клієнт 1', segment: 'Економні', desc: 'Низькі витрати, низький дохід', color: '#722ed1' },
    { id: 2, x: 16, y: 81, label: 'Клієнт 2', segment: 'Марнотрати', desc: 'Високі витрати, низький дохід', color: '#ff4d4f' },
    { id: 3, x: 75, y: 78, label: 'Клієнт 3', segment: 'VIP-клієнти', desc: 'Високі витрати, високий дохід', color: '#52c41a' },
    { id: 4, x: 80, y: 92, label: 'Клієнт 4', segment: 'VIP-клієнти', desc: 'Високі витрати, високий дохід', color: '#52c41a' },
    { id: 5, x: 50, y: 50, label: 'Клієнт 5', segment: 'Лояльні', desc: 'Середні витрати, середній дохід', color: '#fa8c16' },
    { id: 6, x: 55, y: 46, label: 'Клієнт 6', segment: 'Лояльні', desc: 'Середні витрати, середній дохід', color: '#fa8c16' },
    { id: 7, x: 28, y: 15, label: 'Клієнт 7', segment: 'Економні', desc: 'Низькі витрати, низький дохід', color: '#722ed1' },
    { id: 8, x: 32, y: 22, label: 'Клієнт 8', segment: 'Економні', desc: 'Низькі витрати, низький дохід', color: '#722ed1' }
  ];

  const chartData = customers.map(c => ({
    x: c.x,
    y: c.y,
    id: c.id,
    label: c.label,
    segment: isSegmented ? c.segment : 'Невизначено',
    color: isSegmented ? c.color : '#8c8c8c'
  }));

  const columns = [
    { title: 'Клієнт', dataIndex: 'label', key: 'label', render: (text) => <Text strong>{text}</Text> },
    { title: 'Річний дохід ($ тис.)', dataIndex: 'x', key: 'x' },
    { title: 'Індекс витрат (1-100)', dataIndex: 'y', key: 'y' },
    { title: 'Сегмент', dataIndex: 'segment', key: 'segment', render: (segment, record) => <Tag color={isSegmented ? record.color : 'default'}>{segment}</Tag> },
    { title: 'Маркетингова дія', dataIndex: 'desc', key: 'desc', render: (desc, record) => isSegmented ? (
      <Text strong style={{ color: record.color }}>
        {record.segment === 'VIP-клієнти' ? 'Преміум-новинки' : record.segment === 'Лояльні' ? 'Бонусна програма' : record.segment === 'Марнотрати' ? 'Гарячі акції' : 'Дисконтний купон'}
      </Text>
    ) : <Text type="secondary">—</Text> }
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><UserOutlined /> Сегментація покупців для таргетованого маркетингу</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#f6ffed', borderLeft: '4px solid #52c41a' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#277515' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Це приклад **сегментації клієнтів (Customer Segmentation)** на основі їхнього доходу та споживчої поведінки.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це працює:</b> Спочатку ми маємо розрізнену хмару покупців (сірі точки на графіку). Запускаючи ієрархічну кластеризацію, 
            алгоритм починає попарно об'єднувати найближчих клієнтів у групи. Наприкінці ми отримуємо 4 чіткі бізнес-кластери:
            1. <i>VIP (Зелені)</i>: Великий дохід + великі витрати (цільова аудіторія люкс-брендів). 
            2. <i>Лояльні (Помаранчеві)</i>: Стабільний середній клас. 
            3. <i>Марнотрати (Червоні)</i>: Малий дохід, але купують багато (емоційні покупки). 
            4. <i>Економні (Фіолетові)</i>: Раціональні покупці з низьким бюджетом.
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Карта покупців" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} extra={
            <Button type={isSegmented ? 'default' : 'primary'} onClick={() => setIsSegmented(!isSegmented)}>
              {isSegmented ? 'Скинути' : 'Запустити сегментацію'}
            </Button>
          }>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="Дохід" unit="k$" domain={[0, 100]} />
                  <YAxis type="number" dataKey="y" name="Витрати" domain={[0, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Покупці" data={chartData}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Table dataSource={customers} columns={columns} pagination={false} rowKey="id" size="small" bordered />
        </Col>
      </Row>
    </Card>
  );
};

// --- CASE 2: NEWS CLUSTERING ---
const NewsClusteringDemo = () => {
  const [isSegmented, setIsSegmented] = useState(false);

  const articles = [
    { id: 1, x: 85, y: 10, label: 'Матч Ліги Чемпіонів', segment: 'Спорт', color: '#1890ff' },
    { id: 2, x: 92, y: 5, label: 'Фінал Вімблдону', segment: 'Спорт', color: '#1890ff' },
    { id: 3, x: 10, y: 88, label: 'Презентація iOS 20', segment: 'Технології', color: '#722ed1' },
    { id: 4, x: 5, y: 92, label: 'Нові процесори Intel', segment: 'Технології', color: '#722ed1' },
    { id: 5, x: 75, y: 70, label: 'Кіберспортивний турнір CS2', segment: 'Кіберспорт / Змішаний', color: '#fa8c16' },
    { id: 6, x: 68, y: 82, label: 'Технології VR у футболі', segment: 'Кіберспорт / Змішаний', color: '#fa8c16' }
  ];

  const chartData = articles.map(a => ({
    x: a.x,
    y: a.y,
    id: a.id,
    label: a.label,
    segment: isSegmented ? a.segment : 'Невизначено',
    color: isSegmented ? a.color : '#8c8c8c'
  }));

  const columns = [
    { title: 'Заголовок новини', dataIndex: 'label', key: 'label', render: (text) => <Text strong>{text}</Text> },
    { title: 'Ключові слова про Спорт (%)', dataIndex: 'x', key: 'x' },
    { title: 'Ключові слова про IT (%)', dataIndex: 'y', key: 'y' },
    { title: 'Тематичний розділ', dataIndex: 'segment', key: 'segment', render: (s, record) => <Tag color={isSegmented ? record.color : 'default'}>{s}</Tag> }
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><ReadOutlined /> Автоматичне групування новин (Google News / Topic Modeling)</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#e6f7ff', borderLeft: '4px solid #1677ff' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#0050b3' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Це спрощена версія **тематичного моделювання (Topic Modeling)**, що автоматично групує новинні стрічки без участі редакторів.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це працює:</b> Тексти новин перетворюються на числа за допомогою частоти ключових слів (наприклад, згадки слів «гол», «матч» проти «процесор», «VR»). 
            Після запуску кластеризації алгоритм ієрархічно об'єднує новини зі схожими пропорціями слів. 
            В результаті утворюються чіткі гілки новинної стрічки: суто *Спортивні новини* (Сині), суто *Технології* (Фіолетові) та змішана категорія *Кіберспорт / VR-інтеграції* (Помаранчеві).
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Спектральний розподіл новин" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} extra={
            <Button type={isSegmented ? 'default' : 'primary'} onClick={() => setIsSegmented(!isSegmented)}>
              {isSegmented ? 'Групувати новини' : 'Запустити алгоритм'}
            </Button>
          }>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="Спорт" domain={[0, 100]} />
                  <YAxis type="number" dataKey="y" name="Технології" domain={[0, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Статті" data={chartData}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Table dataSource={articles} columns={columns} pagination={false} rowKey="id" size="small" bordered />
        </Col>
      </Row>
    </Card>
  );
};

// --- CASE 3: ECOLOGY ---
const EcologyMonitoringDemo = () => {
  const [isSegmented, setIsSegmented] = useState(false);

  const stations = [
    { id: 1, x: 12, y: 15, label: 'Станція 1 (Лісопарк)', segment: 'Чиста еко-зона', color: '#52c41a' },
    { id: 2, x: 20, y: 18, label: 'Станція 2 (Передмістя)', segment: 'Чиста еко-зона', color: '#52c41a' },
    { id: 3, x: 65, y: 72, label: 'Станція 3 (Спальний район)', segment: 'Помірне забруднення', color: '#fa8c16' },
    { id: 4, x: 55, y: 60, label: 'Станція 4 (Автомагістраль)', segment: 'Помірне забруднення', color: '#fa8c16' },
    { id: 5, x: 130, y: 120, label: 'Станція 5 (Металургійний завод)', segment: 'Критичне забруднення', color: '#f5222d' },
    { id: 6, x: 115, y: 140, label: 'Станція 6 (ТЕЦ)', segment: 'Критичне забруднення', color: '#f5222d' }
  ];

  const chartData = stations.map(s => ({
    x: s.x,
    y: s.y,
    id: s.id,
    label: s.label,
    segment: isSegmented ? s.segment : 'Невизначено',
    color: isSegmented ? s.color : '#8c8c8c'
  }));

  const columns = [
    { title: 'Пост спостереження', dataIndex: 'label', key: 'label', render: (text) => <Text strong>{text}</Text> },
    { title: 'Пил PM2.5 (мкг/м³)', dataIndex: 'x', key: 'x' },
    { title: 'Діоксид азоту NO2 (мкг/м³)', dataIndex: 'y', key: 'y' },
    { title: 'Статус повітря', dataIndex: 'segment', key: 'segment', render: (s, record) => <Tag color={isSegmented ? record.color : 'default'}>{s}</Tag> }
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }} title={<Text strong style={{ fontSize: 18 }}><CompassOutlined /> Екологічний аналіз міського середовища</Text>}>
      <Card bordered={false} style={{ marginBottom: 24, background: '#fff2e8', borderLeft: '4px solid #fa541c' }} size="small">
        <Space direction="vertical" size="small">
          <Text strong style={{ color: '#ad2102' }}><InfoCircleOutlined /> Детальний опис технології:</Text>
          <Paragraph style={{ margin: 0, color: '#262626' }}>
            Цей кейс показує, як за допомогою кластеризації екологи виявляють зони небезпечного забруднення в реальному часі.
          </Paragraph>
          <Paragraph style={{ margin: 0, color: '#595959', fontSize: 13 }}>
            <b>Як це працює:</b> Станції екологічного моніторингу вимірюють концентрації небезпечного пилу PM2.5 та діоксиду азоту NO2. 
            Алгоритм кластеризації об'єднує пости спостереження у групи на основі екологічних профілів. 
            Це дає змогу міській владі виділити *Критичні зони* (Червоні) для встановлення еко-фільтрів на підприємствах, *Помірні зони* (Помаранчеві) та повністю безпечні *Чисті еко-зони* (Зелені) для житлової забудови.
          </Paragraph>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Карта забрудненості міста" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} extra={
            <Button type={isSegmented ? 'default' : 'primary'} onClick={() => setIsSegmented(!isSegmented)}>
              {isSegmented ? 'Зонувати місто' : 'Запустити групування'}
            </Button>
          }>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="PM2.5" unit=" мкг" domain={[0, 150]} />
                  <YAxis type="number" dataKey="y" name="NO2" unit=" мкг" domain={[0, 150]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Станції" data={chartData}>
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Table dataSource={stations} columns={columns} pagination={false} rowKey="id" size="small" bordered />
        </Col>
      </Row>
    </Card>
  );
};
