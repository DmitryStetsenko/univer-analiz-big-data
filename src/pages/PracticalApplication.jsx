import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Tabs, Slider, Row, Col, Typography, Space, Tag, Alert, Button, Table, Divider } from 'antd';
import { 
  ExperimentOutlined, 
  UserOutlined, 
  PlayCircleOutlined, 
  StarOutlined, 
  RocketOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  LineChartOutlined
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
                <PlayCircleOutlined /> Рекомендаційні системи (Міри відстаней)
              </span>
            ),
            children: <MovieRecommendationDemo />
          },
          {
            key: 'segmentation',
            label: (
              <span>
                <LineChartOutlined /> Сегментація клієнтів (Кластеризація)
              </span>
            ),
            children: <CustomerSegmentationDemo />
          }
        ]}
      />
    </div>
  );
};

// === DEMO 1: COLLABORATIVE FILTERING MOVIE RECOMMENDATION ===
const MovieRecommendationDemo = () => {
  // Current user ratings
  const [myRatings, setMyRatings] = useState({
    interstellar: 4,
    matrix: 4,
    lalaland: 1
  });

  const [metric, setMetric] = useState('Euclidean');

  // Other users' ratings
  const users = [
    { name: 'Олексій (Фанат Sci-Fi)', ratings: { interstellar: 5, matrix: 5, lalaland: 2, tenet: 5 }, color: '#1890ff' },
    { name: 'Марія (Фанат мелодрам)', ratings: { interstellar: 2, matrix: 1, lalaland: 5, tenet: 1 }, color: '#eb2f96' },
    { name: 'Дмитро (Універсал)', ratings: { interstellar: 4, matrix: 3, lalaland: 4, tenet: 4 }, color: '#fa8c16' }
  ];

  // Calculate distance between "Me" and another user
  const calculateDistance = (otherUser, selectedMetric) => {
    const d1 = myRatings.interstellar - otherUser.ratings.interstellar;
    const d2 = myRatings.matrix - otherUser.ratings.matrix;
    const d3 = myRatings.lalaland - otherUser.ratings.lalaland;

    const absD1 = Math.abs(d1);
    const absD2 = Math.abs(d2);
    const absD3 = Math.abs(d3);

    switch (selectedMetric) {
      case 'Euclidean':
        return Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
      case 'Squared Euclidean':
        return d1 * d1 + d2 * d2 + d3 * d3;
      case 'Manhattan':
        return absD1 + absD2 + absD3;
      case 'Chebyshev':
        return Math.max(absD1, absD2, absD3);
      default:
        return Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
    }
  };

  // Compute distances to all users
  const computedDistances = users.map(user => ({
    ...user,
    distance: calculateDistance(user, metric)
  }));

  // Find most similar user (minimum distance)
  let closestUser = computedDistances[0];
  computedDistances.forEach(u => {
    if (u.distance < closestUser.distance) {
      closestUser = u;
    }
  });

  // Recommended movie rating by closest user
  const recommendedMovie = {
    title: 'Тенет (Tenet)',
    ratingByClosest: closestUser.ratings.tenet,
    reason: `Ваш найближчий сусід за оцінками — ${closestUser.name} (відстань: ${closestUser.distance.toFixed(2)}). Він оцінив цей фільм на ${closestUser.ratings.tenet} зірок.`
  };

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
    <Card bordered={false} style={{ background: '#fafafa' }}>
      <Row gutter={[24, 24]}>
        {/* Sliders for user input */}
        <Col xs={24} lg={10}>
          <Card title="Ваші оцінки фільмів" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Paragraph type="secondary">
              Налаштуйте свої оцінки (від 1 до 5), щоб система перерахувала відстані до інших користувачів та підібрала рекомендацію.
            </Paragraph>
            <Divider style={{ margin: '12px 0' }} />
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>Інтерстеллар (Sci-Fi)</Text>
                  <Tag color="blue">{myRatings.interstellar} ★</Tag>
                </div>
                <Slider min={1} max={5} value={myRatings.interstellar} onChange={(v) => setMyRatings({...myRatings, interstellar: v})} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>Матриця (Sci-Fi / Екшн)</Text>
                  <Tag color="blue">{myRatings.matrix} ★</Tag>
                </div>
                <Slider min={1} max={5} value={myRatings.matrix} onChange={(v) => setMyRatings({...myRatings, matrix: v})} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>Ла-Ла Ленд (Мюзикл / Драма)</Text>
                  <Tag color="pink">{myRatings.lalaland} ★</Tag>
                </div>
                <Slider min={1} max={5} value={myRatings.lalaland} onChange={(v) => setMyRatings({...myRatings, lalaland: v})} />
              </div>
            </Space>

            <Divider style={{ margin: '16px 0' }} />
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Оберіть міру близькості для розрахунку:</Text>
            <Space wrap>
              {['Euclidean', 'Squared Euclidean', 'Manhattan', 'Chebyshev'].map(m => (
                <Button 
                  key={m} 
                  type={metric === m ? 'primary' : 'default'} 
                  size="small"
                  onClick={() => setMetric(m)}
                >
                  {m === 'Euclidean' ? 'Евклід' : m === 'Squared Euclidean' ? 'Кв. Евкліда' : m === 'Manhattan' ? 'Манхеттен' : 'Чебишев'}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Results and Recommendation output */}
        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Таблиця оцінок та розраховані відстані" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Table 
                dataSource={computedDistances} 
                columns={columns} 
                pagination={false} 
                rowKey="name" 
                size="small" 
                bordered
              />
            </Card>

            <Alert
              message={
                <span style={{ fontSize: 16, fontWeight: 700 }}>
                  <RocketOutlined /> Персональна рекомендація для вас
                </span>
              }
              description={
                <div style={{ marginTop: 8 }}>
                  <Paragraph style={{ fontSize: 15 }}>
                    Рекомендуємо фільм: <b style={{ color: '#1890ff', fontSize: 16 }}>{recommendedMovie.title}</b>
                  </Paragraph>
                  <Paragraph type="secondary">
                    {recommendedMovie.reason}
                  </Paragraph>
                  <div style={{ background: '#f5f5f5', padding: '8px 12px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text strong>Очікувана оцінка фільму: {recommendedMovie.ratingByClosest} ★</Text>
                  </div>
                </div>
              }
              type="info"
              showIcon={false}
              style={{ borderLeft: '5px solid #1890ff', background: '#e6f7ff' }}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

// === DEMO 2: RETAIL CUSTOMER SEGMENTATION ===
const CustomerSegmentationDemo = () => {
  const [isSegmented, setIsSegmented] = useState(false);

  // 8 retail customers with Annual Income ($k) and Spending Score (1-100)
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
    { title: 'Дохід ($ тис.)', dataIndex: 'x', key: 'x' },
    { title: 'Індекс витрат (1-100)', dataIndex: 'y', key: 'y' },
    { 
      title: 'Сегмент', 
      dataIndex: 'segment', 
      key: 'segment', 
      render: (segment, record) => (
        <Tag color={isSegmented ? record.color : 'default'}>
          {segment}
        </Tag>
      ) 
    },
    { title: 'Характеристика сегменту', dataIndex: 'desc', key: 'desc', render: (desc) => isSegmented ? <Text type="secondary">{desc}</Text> : <Text type="secondary">—</Text> }
  ];

  return (
    <Card bordered={false} style={{ background: '#fafafa' }}>
      <Row gutter={[24, 24]}>
        {/* Scatter plot visualization */}
        <Col xs={24} lg={12}>
          <Card 
            title="Карта розподілу покупців" 
            size="small" 
            bordered={false} 
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            extra={
              <Button 
                type={isSegmented ? 'default' : 'primary'} 
                onClick={() => setIsSegmented(!isSegmented)}
              >
                {isSegmented ? 'Скинути' : 'Запустити сегментацію'}
              </Button>
            }
          >
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" name="Річний дохід" unit=" тис.$" domain={[0, 100]} />
                  <YAxis type="number" dataKey="y" name="Індекс витрат" unit="" domain={[0, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Покупці" data={chartData}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: isSegmented ? '#ff4d4f' : '#8c8c8c', display: 'inline-block' }} />
                <Text size="small">Марнотрати</Text>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: isSegmented ? '#52c41a' : '#8c8c8c', display: 'inline-block' }} />
                <Text size="small">VIP-клієнти</Text>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: isSegmented ? '#fa8c16' : '#8c8c8c', display: 'inline-block' }} />
                <Text size="small">Лояльні</Text>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: isSegmented ? '#722ed1' : '#8c8c8c', display: 'inline-block' }} />
                <Text size="small">Економні</Text>
              </span>
            </div>
          </Card>
        </Col>

        {/* Informative Table and descriptions */}
        <Col xs={24} lg={12}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card title="Дані покупців та їх сегменти" size="small" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <Table 
                dataSource={customers} 
                columns={columns} 
                pagination={false} 
                rowKey="id" 
                size="small" 
                bordered
              />
            </Card>

            {isSegmented && (
              <Alert
                message={<Text strong><InfoCircleOutlined /> Маркетингова цінність результату</Text>}
                description={
                  <ul style={{ paddingLeft: 16, margin: '8px 0 0 0', color: '#595959' }}>
                    <li><b>VIP-клієнти (Зелені):</b> Отримують пропозиції на преміальні товари, запрошення на закриті розпродажі.</li>
                    <li><b>Лояльні (Помаранчеві):</b> Їм надсилаються накопичувальні бонуси та пропозиції на товари повсякденного вжитку.</li>
                    <li><b>Марнотрати (Червоні):</b> Для них важлива візуальна картинка — надсилаємо push-повідомлення про гарячі акції.</li>
                    <li><b>Економні (Фіолетові):</b> Залучаємо знижками, купонами та пропозиціями товарів бюджетної категорії.</li>
                  </ul>
                }
                type="success"
              />
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
