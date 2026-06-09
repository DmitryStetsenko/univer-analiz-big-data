import React from 'react';
import { Card, Table, Typography, Row, Col, Tag, Divider, Alert } from 'antd';
import { BookOutlined, InteractionOutlined, BarChartOutlined, LineChartOutlined, PercentageOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const Theory = () => {
  // Measurement scales data
  const scalesData = [
    {
      key: 'nominal',
      name: 'Номінальна (Шкала найменувань)',
      description: 'Якісні категорії без впорядкування. Тільки групування за назвою чи типом.',
      operations: ['=, ≠'],
      stats: 'Мода, Частотний розподіл',
      examples: 'Стать, колір очей, країна, IP-адреса, тип пристрою'
    },
    {
      key: 'ordinal',
      name: 'Порядкова (Рангова)',
      description: 'Категорії мають природний порядок (ранг), але інтервали між ними не є вимірними.',
      operations: ['=, ≠', '>, <'],
      stats: 'Медіана, Квартилі, Рангова кореляція (Спірмен)',
      examples: 'Рейтинги задоволеності (1-5), оцінки в школі, посади (молодший -> старший)'
    },
    {
      key: 'interval',
      name: 'Інтервальна (Шкала різниць)',
      description: 'Рівні інтервали між значеннями, але нульова точка вибрана умовно (немає абсолютного нуля).',
      operations: ['=, ≠', '>, <', '+, -'],
      stats: 'Середнє арифметичне, Дисперсія, Кореляція Пірсона',
      examples: 'Температура в градусах Цельсія (0°C не означає відсутність тепла), календарний рік'
    },
    {
      key: 'ratio',
      name: 'Відносна (Шкала відношень)',
      description: 'Є фіксовані інтервали та абсолютний нуль, що означає повну відсутність ознаки.',
      operations: ['Усі: =, ≠, >, <, +, -, *, /'],
      stats: 'Всі статистичні міри (включаючи геометричне середнє, коефіцієнт варіації)',
      examples: 'Обсяг виробництва, вага, зріст, доходи, час виконання запиту в мс'
    }
  ];

  const scalesColumns = [
    {
      title: 'Шкала',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => {
        let color = 'blue';
        if (record.key === 'nominal') color = 'default';
        if (record.key === 'ordinal') color = 'blue';
        if (record.key === 'interval') color = 'purple';
        if (record.key === 'ratio') color = 'green';
        return <Tag color={color} style={{ fontSize: 13, padding: '4px 8px', fontWeight: 600 }}>{text}</Tag>;
      }
    },
    {
      title: 'Опис шкали',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Математичні операції',
      dataIndex: 'operations',
      key: 'operations',
      width: 180,
      render: (ops) => ops.map(op => <Tag color="magenta" key={op}>{op}</Tag>)
    },
    {
      title: 'Статистичні міри',
      dataIndex: 'stats',
      key: 'stats',
      width: 200,
      render: (text) => <Text code>{text}</Text>
    },
    {
      title: 'Приклади',
      dataIndex: 'examples',
      key: 'examples'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}><BookOutlined /> Інтерактивний конспект лекцій</Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Основні теоретичні поняття з курсу "Аналіз та обробка великих даних" у зручному візуальному форматі.
        </Paragraph>
      </div>

      {/* 1. Measurement scales */}
      <Card 
        title={<><BarChartOutlined style={{ color: '#1890ff' }} /> 1. Шкали вимірювань даних</>}
        style={{ marginBottom: 24 }}
        hoverable
      >
        <Paragraph>
          Шкала вимірювань визначає тип математичної інформації, яку несуть дані, і накладає суворі обмеження на типи допустимих статистичних методів і розрахунків.
        </Paragraph>
        <Table
          dataSource={scalesData}
          columns={scalesColumns}
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* 2. Proximity measures */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={<><LineChartOutlined style={{ color: '#722ed1' }} /> 2. Міри близькості: Подібність vs Відстань</>}
            hoverable
            style={{ height: '100%' }}
          >
            <Paragraph>
              Міри близькості виражають, наскільки схожими або відмінними є два об'єкти. Вони записуються у вигляді квадратних симетричних матриць розміром <i>N × N</i>.
            </Paragraph>

            <Row gutter={16}>
              <Col span={12}>
                <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: 12, borderRadius: 8, height: '100%' }}>
                  <Text strong style={{ color: '#389e0d', display: 'block', marginBottom: 8 }}>
                    Матриця подібності (Similarity)
                  </Text>
                  <Paragraph style={{ fontSize: 13 }}>
                    Елемент <b>s_ij</b> вимірює схожість. Чим більше значення, тим більш схожі об'єкти (діапазон [0, 1] або [-1, 1]).
                  </Paragraph>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, background: '#fff', padding: 8, borderRadius: 4, border: '1px solid #d9d9d9' }}>
                    [ <b>1.0</b>  0.8  0.2 ]<br />
                    [ 0.8  <b>1.0</b>  0.1 ]<br />
                    [ 0.2  0.1  <b>1.0</b> ]
                  </div>
                  <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: 12 }}>
                    <li>На діагоналі завжди <b>одиниці</b> (s_ii = 1)</li>
                    <li>Об'єкт повністю схожий на себе</li>
                  </ul>
                </div>
              </Col>
              
              <Col span={12}>
                <div style={{ background: '#fff7e6', border: '1px solid #ffd591', padding: 12, borderRadius: 8, height: '100%' }}>
                  <Text strong style={{ color: '#d46b08', display: 'block', marginBottom: 8 }}>
                    Матриця відстаней (Dissimilarity)
                  </Text>
                  <Paragraph style={{ fontSize: 13 }}>
                    Елемент <b>d_ij</b> вимірює несхожість. Чим більше значення, тим менш схожі об'єкти. Відстань завжди ≥ 0.
                  </Paragraph>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, background: '#fff', padding: 8, borderRadius: 4, border: '1px solid #d9d9d9' }}>
                    [ <b>0.0</b>  2.8  7.1 ]<br />
                    [ 2.8  <b>0.0</b>  8.9 ]<br />
                    [ 7.1  8.9  <b>0.0</b> ]
                  </div>
                  <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: 12 }}>
                    <li>На діагоналі завжди <b>нулі</b> (d_ii = 0)</li>
                    <li>Відстань від об'єкта до себе = 0</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 3. Clustering algorithms direction */}
        <Col xs={24} lg={12}>
          <Card 
            title={<><InteractionOutlined style={{ color: '#52c41a' }} /> 3. Ієрархічна кластеризація</>}
            hoverable
            style={{ height: '100%' }}
          >
            <Paragraph>
              Ієрархічні методи будують деревоподібну структуру вкладених кластерів (ієрархію). Існує два принципово протилежних напрямки побудови цієї структури:
            </Paragraph>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <svg width="340" height="150" style={{ background: '#fafafa', borderRadius: 8, padding: 8 }}>
                {/* Agglomerative (Bottom-up) */}
                <rect x="10" y="10" width="130" height="30" rx="5" fill="#e6f7ff" stroke="#91d5ff" />
                <text x="75" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0050b3">1 Великий Кластер</text>
                
                <path d="M 75 45 L 75 95" stroke="#1890ff" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="80" y="75" fontSize="10" fill="#1890ff" transform="rotate(90 80 75)">РОЗДІЛЕННЯ</text>
                
                <rect x="10" y="100" width="130" height="30" rx="5" fill="#f5f5f5" stroke="#d9d9d9" />
                <text x="75" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#595959">N Окремих Точок</text>

                {/* Divisive (Top-down) */}
                <rect x="200" y="10" width="130" height="30" rx="5" fill="#e6f7ff" stroke="#91d5ff" />
                <text x="265" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0050b3">1 Великий Кластер</text>
                
                <path d="M 265 95 L 265 45" stroke="#52c41a" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="260" y="75" fontSize="10" fill="#52c41a" transform="rotate(-90 260 75)">ОБ'ЄДНАННЯ</text>
                
                <rect x="200" y="100" width="130" height="30" rx="5" fill="#f5f5f5" stroke="#d9d9d9" />
                <text x="265" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#595959">N Окремих Точок</text>

                {/* Marker definition for arrow */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#1890ff" />
                  </marker>
                </defs>
              </svg>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Text strong style={{ color: '#1890ff' }}>Дивізимні алгоритми</Text>
                <div style={{ fontSize: 12, color: '#595959', marginTop: 4 }}>
                  <b>Зверху вниз (Top-Down):</b> починають з одного великого кластера, що містить всі об'єкти, і на кожному кроці розбивають його на менші підкластери.
                </div>
              </Col>
              
              <Col span={12}>
                <Text strong style={{ color: '#52c41a' }}>Агломеративні алгоритми</Text>
                <div style={{ fontSize: 12, color: '#595959', marginTop: 4 }}>
                  <b>Знизу вгору (Bottom-Up):</b> кожен об'єкт спочатку вважається окремим кластером, які послідовно об'єднуються у дедалі більші групи (як у Лабораторних 2 та 3).
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Alert
        title="Зв'язок теорії та лабораторних робіт"
        description={
          <div>
            У лабораторній роботі №1 ми працювали з числовими даними в <b>інтервальній та відносній шкалах</b> і розраховували <b>матрицю відстаней (несхожості)</b>. 
            У лабораторних роботах №2 та №3 ми застосовували <b>агломеративні алгоритми</b> ієрархічної кластеризації з різними методами зв'язку (мінімум та максимум) для побудови <b>дендрограми</b>.
          </div>
        }
        type="info"
        showIcon
      />
    </div>
  );
};
