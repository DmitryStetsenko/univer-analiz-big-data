import React, { useState } from 'react';
import { Collapse, Input, Typography, Card, Badge, Tag, Empty, Space } from 'antd';
import { SearchOutlined, QuestionCircleOutlined, BulbOutlined } from '@ant-design/icons';
import { examQuestions } from '../data/examQuestions';

const { Title, Paragraph, Text } = Typography;

export const Exam = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on search query
  const filteredQuestions = examQuestions.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render specific visual aids for questions 13 to 18
  const renderVisualAid = (qId) => {
    switch (qId) {
      case 13: // Classification vs Clustering
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Схема: Класифікація vs Кластеризація
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
              {/* Classification SVG */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Класифікація (З вчителем)</div>
                <svg width="160" height="120" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 6 }}>
                  {/* Class A */}
                  <circle cx="40" cy="40" r="6" fill="#f5222d" />
                  <circle cx="60" cy="30" r="6" fill="#f5222d" />
                  <circle cx="50" cy="50" r="6" fill="#f5222d" />
                  <text x="50" y="70" fontSize="10" fill="#f5222d" fontWeight="bold" textAnchor="middle">Клас А (червоні)</text>
                  
                  {/* Class B */}
                  <rect x="100" y="30" width="10" height="10" fill="#1890ff" />
                  <rect x="120" y="45" width="10" height="10" fill="#1890ff" />
                  <rect x="110" y="20" width="10" height="10" fill="#1890ff" />
                  <text x="115" y="70" fontSize="10" fill="#1890ff" fontWeight="bold" textAnchor="middle">Клас Б (сині)</text>
                  
                  {/* Decision Boundary */}
                  <line x1="85" y1="10" x2="85" y2="90" stroke="#bfbfbf" strokeDasharray="3 3" />
                  <text x="85" y="105" fontSize="8" fill="#8c8c8c" textAnchor="middle">Межа рішення</text>
                </svg>
              </div>

              {/* Clustering SVG */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Кластеризація (Без вчителя)</div>
                <svg width="160" height="120" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 6 }}>
                  {/* Unlabeled objects forming clusters */}
                  {/* Group 1 */}
                  <circle cx="40" cy="35" r="5" fill="#8c8c8c" />
                  <circle cx="55" cy="45" r="5" fill="#8c8c8c" />
                  <circle cx="35" cy="50" r="5" fill="#8c8c8c" />
                  <ellipse cx="43" cy="43" rx="22" ry="16" fill="none" stroke="#52c41a" strokeWidth="1.5" />
                  <text x="43" y="75" fontSize="10" fill="#52c41a" fontWeight="bold" textAnchor="middle">Кластер 1</text>
                  
                  {/* Group 2 */}
                  <circle cx="115" cy="40" r="5" fill="#8c8c8c" />
                  <circle cx="125" cy="30" r="5" fill="#8c8c8c" />
                  <circle cx="110" cy="50" r="5" fill="#8c8c8c" />
                  <ellipse cx="117" cy="40" rx="20" ry="16" fill="none" stroke="#722ed1" strokeWidth="1.5" />
                  <text x="117" y="75" fontSize="10" fill="#722ed1" fontWeight="bold" textAnchor="middle">Кластер 2</text>
                  
                  <text x="80" y="105" fontSize="8" fill="#8c8c8c" textAnchor="middle">Групування за близькістю</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 14: // Types of Hierarchical Clustering (Agglomerative vs Divisive)
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Схема: Напрями побудови ієрархії
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="300" height="130" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 6 }}>
                {/* Dendrogram Tree diagram */}
                {/* Root */}
                <rect x="120" y="15" width="60" height="20" rx="3" fill="#d9d9d9" stroke="#bfbfbf" />
                <text x="150" y="29" fontSize="10" fontWeight="bold" textAnchor="middle">ABCD</text>

                {/* Left Branch */}
                <rect x="50" y="60" width="40" height="20" rx="3" fill="#e6f7ff" stroke="#91d5ff" />
                <text x="70" y="74" fontSize="10" textAnchor="middle">AB</text>

                {/* Right Branch */}
                <rect x="210" y="60" width="40" height="20" rx="3" fill="#f9f0ff" stroke="#d3adf7" />
                <text x="230" y="74" fontSize="10" textAnchor="middle">CD</text>

                {/* Connection lines */}
                <line x1="150" y1="35" x2="70" y2="60" stroke="#bfbfbf" strokeWidth="1.5" />
                <line x1="150" y1="35" x2="230" y2="60" stroke="#bfbfbf" strokeWidth="1.5" />

                {/* Leaves */}
                <circle cx="45" cy="110" r="8" fill="#fff" stroke="#1890ff" strokeWidth="1.5" />
                <text x="45" y="113" fontSize="9" fontWeight="bold" textAnchor="middle">A</text>
                
                <circle cx="95" cy="110" r="8" fill="#fff" stroke="#1890ff" strokeWidth="1.5" />
                <text x="95" y="113" fontSize="9" fontWeight="bold" textAnchor="middle">B</text>

                <circle cx="205" cy="110" r="8" fill="#fff" stroke="#722ed1" strokeWidth="1.5" />
                <text x="205" y="113" fontSize="9" fontWeight="bold" textAnchor="middle">C</text>
                
                <circle cx="255" cy="110" r="8" fill="#fff" stroke="#722ed1" strokeWidth="1.5" />
                <text x="255" y="113" fontSize="9" fontWeight="bold" textAnchor="middle">D</text>

                <line x1="70" y1="80" x2="45" y2="102" stroke="#bfbfbf" strokeWidth="1" />
                <line x1="70" y1="80" x2="95" y2="102" stroke="#bfbfbf" strokeWidth="1" />
                <line x1="230" y1="80" x2="205" y2="102" stroke="#bfbfbf" strokeWidth="1" />
                <line x1="230" y1="80" x2="255" y2="102" stroke="#bfbfbf" strokeWidth="1" />

                {/* Side Arrows */}
                <path d="M 15 110 L 15 25" fill="none" stroke="#52c41a" strokeWidth="2" markerEnd="url(#arrow-green)" />
                <text x="22" y="68" fontSize="8" fill="#52c41a" fontWeight="bold">Агломеративний ↑</text>

                <path d="M 285 25 L 285 110" fill="none" stroke="#ff4d4f" strokeWidth="2" markerEnd="url(#arrow-red)" />
                <text x="278" y="68" fontSize="8" fill="#ff4d4f" fontWeight="bold" textAnchor="end">↓ Дивізивний</text>

                {/* Arrow markers definitions */}
                <defs>
                  <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#52c41a" />
                  </marker>
                  <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff4d4f" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        );
      case 15: // Steps of Cluster Analysis
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Схема: Алгоритм кластерного аналізу
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={1} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Вибір ознак:</b> визначення набору числових параметрів об'єктів.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={2} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Стандартизація:</b> приведення ознак до однакового масштабу.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={3} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Міра близькості:</b> вибір формули розрахунку відстані (напр. Евклід).</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={4} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Метод зв'язку:</b> вибір способу визначення відстані між кластерами.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={5} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Розрахунок матриці:</b> побудова початкової матриці відстаней.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={6} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Ітераційне об'єднання:</b> злиття найближчих груп та перерахунок матриці.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={7} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Аналіз дендрограми:</b> вибір оптимальної кількості кластерів.</span>
              </div>
            </div>
          </div>
        );
      case 16: // Linkage Methods
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Схема: Визначення відстаней між кластерами
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
              {/* Single Linkage SVG */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>Найближчий сусід (Single Linkage)</div>
                <svg width="130" height="90" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                  {/* Cluster A */}
                  <circle cx="20" cy="40" r="4" fill="#1890ff" />
                  <circle cx="35" cy="30" r="4" fill="#1890ff" />
                  <circle cx="25" cy="55" r="4" fill="#1890ff" />
                  <ellipse cx="27" cy="42" rx="15" ry="20" fill="none" stroke="#91d5ff" strokeWidth="1" />
                  
                  {/* Cluster B */}
                  <circle cx="95" cy="35" r="4" fill="#722ed1" />
                  <circle cx="105" cy="50" r="4" fill="#722ed1" />
                  <circle cx="90" cy="58" r="4" fill="#722ed1" />
                  <ellipse cx="97" cy="48" rx="15" ry="18" fill="none" stroke="#d3adf7" strokeWidth="1" />

                  {/* Distance line */}
                  <line x1="35" y1="30" x2="95" y2="35" stroke="#ff4d4f" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="65" y="25" fontSize="8" fill="#ff4d4f" fontWeight="bold" textAnchor="middle">D(A,B) = мін</text>
                </svg>
              </div>

              {/* Complete Linkage SVG */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>Найдальший сусід (Complete Linkage)</div>
                <svg width="130" height="90" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                  {/* Cluster A */}
                  <circle cx="25" cy="40" r="4" fill="#1890ff" />
                  <circle cx="35" cy="30" r="4" fill="#1890ff" />
                  <circle cx="20" cy="55" r="4" fill="#1890ff" />
                  <ellipse cx="27" cy="42" rx="15" ry="20" fill="none" stroke="#91d5ff" strokeWidth="1" />
                  
                  {/* Cluster B */}
                  <circle cx="95" cy="35" r="4" fill="#722ed1" />
                  <circle cx="110" cy="50" r="4" fill="#722ed1" />
                  <circle cx="90" cy="58" r="4" fill="#722ed1" />
                  <ellipse cx="98" cy="48" rx="15" ry="18" fill="none" stroke="#d3adf7" strokeWidth="1" />

                  {/* Distance line */}
                  <line x1="20" y1="55" x2="110" y2="50" stroke="#ff4d4f" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="65" y="80" fontSize="8" fill="#ff4d4f" fontWeight="bold" textAnchor="middle">D(A,B) = макс</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 17: // Proximity Matrix
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Схема: Властивості діагоналей
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
              <Card size="small" title="Матриця відстаней (Dissimilarity)" style={{ width: 220, fontSize: 12 }}>
                <div style={{ fontFamily: 'monospace' }}>
                  d_ii = <b>0</b> (на діагоналі нулі)
                  <br />
                  d_ij ≥ 0 (відстань додатня)
                  <br />
                  d_ij = d_ji (симетричність)
                </div>
                <div style={{ marginTop: 8, color: '#bfbfbf' }}>* Чим менше значення, тим ближче об'єкти.</div>
              </Card>
              <Card size="small" title="Матриця подібності (Similarity)" style={{ width: 220, fontSize: 12 }}>
                <div style={{ fontFamily: 'monospace' }}>
                  s_ii = <b>1</b> (на діагоналі одиниці)
                  <br />
                  s_ij ∈ [0, 1] або [-1, 1]
                  <br />
                  s_ij = s_ji (симетричність)
                </div>
                <div style={{ marginTop: 8, color: '#bfbfbf' }}>* Чим більше значення, тим ближче об'єкти.</div>
              </Card>
            </div>
          </div>
        );
      case 18: // Distance Measures
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BulbOutlined style={{ color: '#faad14' }} /> Візуалізація: Евклідова vs Манхеттенська відстань
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="240" height="140" style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                {/* Grid */}
                <line x1="20" y1="20" x2="220" y2="20" stroke="#f0f0f0" />
                <line x1="20" y1="40" x2="220" y2="40" stroke="#f0f0f0" />
                <line x1="20" y1="60" x2="220" y2="60" stroke="#f0f0f0" />
                <line x1="20" y1="80" x2="220" y2="80" stroke="#f0f0f0" />
                <line x1="20" y1="100" x2="220" y2="100" stroke="#f0f0f0" />
                <line x1="20" y1="120" x2="220" y2="120" stroke="#f0f0f0" />

                <line x1="20" y1="20" x2="20" y2="120" stroke="#f0f0f0" />
                <line x1="60" y1="20" x2="60" y2="120" stroke="#f0f0f0" />
                <line x1="100" y1="20" x2="100" y2="120" stroke="#f0f0f0" />
                <line x1="140" y1="20" x2="140" y2="120" stroke="#f0f0f0" />
                <line x1="180" y1="20" x2="180" y2="120" stroke="#f0f0f0" />
                <line x1="220" y1="20" x2="220" y2="120" stroke="#f0f0f0" />

                {/* Point A */}
                <circle cx="60" cy="100" r="5" fill="#1890ff" />
                <text x="50" y="105" fontSize="10" fontWeight="bold">A</text>

                {/* Point B */}
                <circle cx="180" cy="40" r="5" fill="#722ed1" />
                <text x="190" y="38" fontSize="10" fontWeight="bold">B</text>

                {/* Euclidean path (hypotenuse) */}
                <line x1="60" y1="100" x2="180" y2="40" stroke="#ff4d4f" strokeWidth="2.5" />
                
                {/* Manhattan path (stairs) */}
                <path d="M 60 100 L 180 100 L 180 40" fill="none" stroke="#52c41a" strokeWidth="2.5" strokeDasharray="3 3" />

                {/* Legend */}
                <line x1="30" y1="130" x2="50" y2="130" stroke="#ff4d4f" strokeWidth="2" />
                <text x="55" y="133" fontSize="8" fill="#595959">Евклідова (пряма)</text>

                <line x1="135" y1="130" x2="155" y2="130" stroke="#52c41a" strokeWidth="2" strokeDasharray="3 3" />
                <text x="160" y="133" fontSize="8" fill="#595959">Манхеттенська (сітка)</text>
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Convert raw markdown answers to simple list of elements for display
  const formatAnswer = (question) => {
    const textLines = question.answer.split('\n');
    return (
      <div style={{ padding: '0 8px' }}>
        {textLines.map((line, idx) => {
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
              <ul style={{ margin: '4px 0', paddingLeft: 20 }} key={idx}>
                <li>
                  {line.replace(/^[-*]\s+/, '')}
                </li>
              </ul>
            );
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return <Paragraph key={idx} style={{ marginTop: 12, marginBottom: 6, fontWeight: 'bold' }}>{line.replace(/\*\*/g, '')}</Paragraph>;
          }
          if (line.startsWith('$$') && line.endsWith('$$')) {
            return (
              <div style={{ margin: '12px 0', textAlign: 'center', background: '#f5f5f5', padding: '8px 12px', borderRadius: 4, fontFamily: 'monospace' }} key={idx}>
                {line.replace(/\$\$/g, '')}
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} style={{ height: 6 }} />;
          }
          return <Paragraph key={idx} style={{ marginBottom: 8, lineHeight: 1.6 }}>{line}</Paragraph>;
        })}
        {renderVisualAid(question.id)}
      </div>
    );
  };

  // Build items for Collapse accordion
  const accordionItems = filteredQuestions.map((q) => ({
    key: q.id.toString(),
    label: (
      <Space>
        {q.id >= 13 ? (
          <Tag color="purple" style={{ fontWeight: 600 }}>Тема: Кластеризація</Tag>
        ) : (
          <Tag color="cyan" style={{ fontWeight: 600 }}>Тема: Стат. аналіз</Tag>
        )}
        <Text strong style={{ fontSize: 14 }}>{q.title.replace(/^\d+\.\s+/, '')}</Text>
      </Space>
    ),
    children: formatAnswer(q),
  }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}><QuestionCircleOutlined /> Екзаменаційні питання</Title>
        <Paragraph style={{ color: '#8c8c8c' }}>
          Список 18 екзаменаційних питань з короткими детальними відповідями та інтерактивними схемами для розділу кластеризації.
        </Paragraph>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Input
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          placeholder="Пошук питань за ключовими словами (наприклад: кореляція, Чебишев, класифікація)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="large"
          allowClear
        />
      </Card>

      {accordionItems.length > 0 ? (
        <Collapse
          items={accordionItems}
          defaultActiveKey={[]}
          expandIconPlacement="end"
          style={{ background: '#fff' }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Питань, що відповідають вашому запиту, не знайдено"
        />
      )}
    </div>
  );
};
