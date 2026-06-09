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
          <div style={{ marginTop: 16, background: '#fafafa', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#1f1f1f' }}>
              <BulbOutlined style={{ color: '#faad14', fontSize: 18 }} /> Схема: Порівняння задач класифікації та кластеризації
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
              {/* Classification SVG */}
              <div style={{ textAlign: 'center', flex: '1 1 300px', maxWidth: 380 }}>
                <div style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#262626' }}>Класифікація (Навчання з вчителем)</div>
                <svg 
                  viewBox="0 0 280 200" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    background: '#fff', 
                    border: '1px solid #e8e8e8', 
                    borderRadius: 8, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'block'
                  }}
                >
                  <defs>
                    <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5f5f5" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="280" height="200" fill="url(#grid-pattern)" />
                  
                  {/* Class A - Red Circles */}
                  <circle cx="60" cy="50" r="9" fill="#ff4d4f" stroke="#ff7875" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(255, 77, 79, 0.2))' }} />
                  <circle cx="85" cy="75" r="9" fill="#ff4d4f" stroke="#ff7875" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(255, 77, 79, 0.2))' }} />
                  <circle cx="50" cy="100" r="9" fill="#ff4d4f" stroke="#ff7875" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(255, 77, 79, 0.2))' }} />
                  <text x="65" y="135" fontSize="13" fill="#a8071a" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Клас А (червоні)</text>
                  
                  {/* Class B - Blue Squares */}
                  <rect x="190" y="40" width="18" height="18" rx="2" fill="#1890ff" stroke="#69c0ff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(24, 144, 255, 0.2))' }} />
                  <rect x="215" y="75" width="18" height="18" rx="2" fill="#1890ff" stroke="#69c0ff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(24, 144, 255, 0.2))' }} />
                  <rect x="175" y="90" width="18" height="18" rx="2" fill="#1890ff" stroke="#69c0ff" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 2px 4px rgba(24, 144, 255, 0.2))' }} />
                  <text x="195" y="135" fontSize="13" fill="#0050b3" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Клас Б (сині)</text>
                  
                  {/* Decision Boundary Line */}
                  <line x1="130" y1="15" x2="130" y2="160" stroke="#bfbfbf" strokeWidth="2.5" strokeDasharray="5 4" />
                  <path d="M 130 15 L 125 25 L 135 25 Z" fill="#bfbfbf" />
                  <text x="130" y="180" fontSize="12" fill="#595959" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">Відома межа розділу</text>
                </svg>
              </div>

              {/* Clustering SVG */}
              <div style={{ textAlign: 'center', flex: '1 1 300px', maxWidth: 380 }}>
                <div style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#262626' }}>Кластеризація (Навчання без вчителя)</div>
                <svg 
                  viewBox="0 0 280 200" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    background: '#fff', 
                    border: '1px solid #e8e8e8', 
                    borderRadius: 8, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'block'
                  }}
                >
                  <rect width="280" height="200" fill="url(#grid-pattern)" />
                  
                  {/* Unlabeled Gray Circles */}
                  {/* Cluster Group 1 */}
                  <circle cx="65" cy="50" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <circle cx="85" cy="75" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <circle cx="50" cy="95" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <ellipse cx="66" cy="73" rx="36" ry="42" fill="none" stroke="#52c41a" strokeWidth="2.5" strokeDasharray="3 2" style={{ filter: 'drop-shadow(0px 2px 4px rgba(82, 196, 26, 0.2))' }} />
                  <text x="66" y="135" fontSize="13" fill="#135200" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер 1</text>

                  {/* Cluster Group 2 */}
                  <circle cx="195" cy="50" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <circle cx="215" cy="85" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <circle cx="180" cy="95" r="8" fill="#8c8c8c" stroke="#bfbfbf" />
                  <ellipse cx="196" cy="76" rx="34" ry="40" fill="none" stroke="#722ed1" strokeWidth="2.5" strokeDasharray="3 2" style={{ filter: 'drop-shadow(0px 2px 4px rgba(114, 46, 209, 0.2))' }} />
                  <text x="196" y="135" fontSize="13" fill="#391085" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер 2</text>

                  <text x="140" y="180" fontSize="12" fill="#595959" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">Групування за близькістю (без міток)</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 14: // Types of Hierarchical Clustering (Agglomerative vs Divisive)
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#1f1f1f' }}>
              <BulbOutlined style={{ color: '#faad14', fontSize: 18 }} /> Схема: Напрями побудови ієрархії
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg 
                viewBox="0 0 480 240" 
                style={{ 
                  width: '100%', 
                  maxWidth: '580px', 
                  height: 'auto', 
                  background: '#fff', 
                  border: '1px solid #e8e8e8', 
                  borderRadius: 8, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'block'
                }}
              >
                <defs>
                  <linearGradient id="root-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f5f5f5" />
                    <stop offset="100%" stopColor="#d9d9d9" />
                  </linearGradient>
                  <linearGradient id="ab-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e6f7ff" />
                    <stop offset="100%" stopColor="#bae7ff" />
                  </linearGradient>
                  <linearGradient id="cd-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f9f0ff" />
                    <stop offset="100%" stopColor="#d3adf7" />
                  </linearGradient>
                  
                  <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 5 0 L 10 10 L 0 10 z" fill="#135200" />
                  </marker>
                  <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 5 10 L 0 0 L 10 0 z" fill="#a8071a" />
                  </marker>
                </defs>
                
                {/* Dendrogram Tree */}
                {/* Root (ABCD) */}
                <rect x="190" y="20" width="100" height="34" rx="6" fill="url(#root-grad)" stroke="#bfbfbf" strokeWidth="1.5" />
                <text x="240" y="42" fontSize="13" fontWeight="bold" fill="#262626" textAnchor="middle">ABCD (Корінь)</text>

                {/* Left Branch (AB) */}
                <rect x="90" y="95" width="70" height="30" rx="6" fill="url(#ab-grad)" stroke="#91d5ff" strokeWidth="1.5" />
                <text x="125" y="114" fontSize="13" fontWeight="bold" fill="#003a8c" textAnchor="middle">AB</text>

                {/* Right Branch (CD) */}
                <rect x="320" y="95" width="70" height="30" rx="6" fill="url(#cd-grad)" stroke="#d3adf7" strokeWidth="1.5" />
                <text x="355" y="114" fontSize="13" fontWeight="bold" fill="#391085" textAnchor="middle">CD</text>

                {/* Leaves */}
                <circle cx="75" cy="180" r="16" fill="#fff" stroke="#1890ff" strokeWidth="2" />
                <text x="75" y="185" fontSize="14" fontWeight="bold" fill="#0050b3" textAnchor="middle">A</text>
                
                <circle cx="175" cy="180" r="16" fill="#fff" stroke="#1890ff" strokeWidth="2" />
                <text x="175" y="185" fontSize="14" fontWeight="bold" fill="#0050b3" textAnchor="middle">B</text>

                <circle cx="305" cy="180" r="16" fill="#fff" stroke="#722ed1" strokeWidth="2" />
                <text x="305" y="185" fontSize="14" fontWeight="bold" fill="#531dab" textAnchor="middle">C</text>
                
                <circle cx="405" cy="180" r="16" fill="#fff" stroke="#722ed1" strokeWidth="2" />
                <text x="405" y="185" fontSize="14" fontWeight="bold" fill="#531dab" textAnchor="middle">D</text>

                {/* Connection lines */}
                <line x1="240" y1="54" x2="125" y2="95" stroke="#bfbfbf" strokeWidth="2" />
                <line x1="240" y1="54" x2="355" y2="95" stroke="#bfbfbf" strokeWidth="2" />

                <line x1="125" y1="125" x2="75" y2="164" stroke="#d9d9d9" strokeWidth="1.5" />
                <line x1="125" y1="125" x2="175" y2="164" stroke="#d9d9d9" strokeWidth="1.5" />
                <line x1="355" y1="125" x2="305" y2="164" stroke="#d9d9d9" strokeWidth="1.5" />
                <line x1="355" y1="125" x2="405" y2="164" stroke="#d9d9d9" strokeWidth="1.5" />

                {/* Left Arrow (Agglomerative) */}
                <path d="M 30 190 L 30 35" fill="none" stroke="#52c41a" strokeWidth="3" markerEnd="url(#arrow-up)" />
                <text x="20" y="110" fontSize="12" fill="#135200" fontWeight="bold" transform="rotate(-90 20 110)" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Агломеративний ↑ (Знизу-вгору)</text>

                {/* Right Arrow (Divisive) */}
                <path d="M 450 30 L 450 185" fill="none" stroke="#ff4d4f" strokeWidth="3" markerEnd="url(#arrow-down)" />
                <text x="462" y="110" fontSize="12" fill="#a8071a" fontWeight="bold" transform="rotate(90 462 110)" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">↓ Дивізивний (Зверху-вниз)</text>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={1} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Вибір ознак:</b> визначення набору числових параметрів об'єктів.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={2} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Стандартизація:</b> приведення ознак до опрацьовуваного масштабу.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge count={3} status="processing" style={{ backgroundColor: '#108ee9' }} />
                <span><b>Міра близості:</b> вибір формули розрахунку відстані (напр. Евклід).</span>
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
          <div style={{ marginTop: 16, background: '#fafafa', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#1f1f1f' }}>
              <BulbOutlined style={{ color: '#faad14', fontSize: 18 }} /> Схема: Визначення відстаней між кластерами (Linkage Methods)
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
              {/* Single Linkage SVG */}
              <div style={{ textAlign: 'center', flex: '1 1 300px', maxWidth: 380 }}>
                <div style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#262626' }}>Метод найближчого сусіда (Single Linkage)</div>
                <svg 
                  viewBox="0 0 280 200" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    background: '#fff', 
                    border: '1px solid #e8e8e8', 
                    borderRadius: 8, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'block'
                  }}
                >
                  <defs>
                    <pattern id="grid-pattern-2" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5f5f5" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="280" height="200" fill="url(#grid-pattern-2)" />
                  {/* Cluster A */}
                  <ellipse cx="60" cy="95" rx="35" ry="50" fill="none" stroke="#91d5ff" strokeWidth="2.5" />
                  <circle cx="50" cy="75" r="7" fill="#1890ff" />
                  <circle cx="75" cy="95" r="7" fill="#1890ff" /> {/* closest point to B */}
                  <circle cx="45" cy="120" r="7" fill="#1890ff" />
                  <text x="60" y="165" fontSize="13" fill="#0050b3" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер A</text>
                  
                  {/* Cluster B */}
                  <ellipse cx="220" cy="105" rx="35" ry="45" fill="none" stroke="#d3adf7" strokeWidth="2.5" />
                  <circle cx="205" cy="85" r="7" fill="#722ed1" /> {/* closest point to A */}
                  <circle cx="235" cy="115" r="7" fill="#722ed1" />
                  <circle cx="210" cy="130" r="7" fill="#722ed1" />
                  <text x="220" y="170" fontSize="13" fill="#531dab" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер B</text>

                  {/* Distance line (closest points) */}
                  <line x1="75" y1="95" x2="205" y2="85" stroke="#cf1322" strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="140" y="75" fontSize="12" fill="#a8071a" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">D(A, B) = min d(a, b)</text>
                </svg>
              </div>

              {/* Complete Linkage SVG */}
              <div style={{ textAlign: 'center', flex: '1 1 300px', maxWidth: 380 }}>
                <div style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#262626' }}>Метод найдальшого сусіда (Complete Linkage)</div>
                <svg 
                  viewBox="0 0 280 200" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    background: '#fff', 
                    border: '1px solid #e8e8e8', 
                    borderRadius: 8, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'block'
                  }}
                >
                  <rect width="280" height="200" fill="url(#grid-pattern-2)" />
                  {/* Cluster A */}
                  <ellipse cx="60" cy="95" rx="35" ry="50" fill="none" stroke="#91d5ff" strokeWidth="2.5" />
                  <circle cx="50" cy="75" r="7" fill="#1890ff" />
                  <circle cx="75" cy="95" r="7" fill="#1890ff" />
                  <circle cx="45" cy="120" r="7" fill="#1890ff" /> {/* furthest point from B */}
                  <text x="60" y="165" fontSize="13" fill="#0050b3" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер A</text>
                  
                  {/* Cluster B */}
                  <ellipse cx="220" cy="105" rx="35" ry="45" fill="none" stroke="#d3adf7" strokeWidth="2.5" />
                  <circle cx="205" cy="85" r="7" fill="#722ed1" />
                  <circle cx="235" cy="115" r="7" fill="#722ed1" /> {/* furthest point from A */}
                  <circle cx="210" cy="130" r="7" fill="#722ed1" />
                  <text x="220" y="170" fontSize="13" fill="#531dab" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">Кластер B</text>

                  {/* Distance line (furthest points) */}
                  <line x1="45" y1="120" x2="235" y2="115" stroke="#cf1322" strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="140" y="150" fontSize="12" fill="#a8071a" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">D(A, B) = max d(a, b)</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 17: // Proximity Matrix
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#1f1f1f' }}>
              <BulbOutlined style={{ color: '#faad14', fontSize: 18 }} /> Схема: Порівняння властивостей матриць близькості
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
              <Card size="small" title={<span style={{ color: '#b26206', fontSize: 14.5, fontWeight: 'bold' }}>Матриця відстаней (Dissimilarity)</span>} style={{ width: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: 13.5, lineHeight: 1.8 }}>
                  d_ii = <b style={{ color: '#cf1322', fontSize: 14.5 }}>0</b> (на діагоналі завжди нулі)
                  <br />
                  d_ij ≥ 0 (відстань невід'ємна)
                  <br />
                  d_ij = d_ji (симетричність)
                </div>
                <div style={{ marginTop: 12, color: '#595959', fontSize: 12, fontStyle: 'italic', borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
                  * Менше значення означає вищу подібність об'єктів.
                </div>
              </Card>
              <Card size="small" title={<span style={{ color: '#237804', fontSize: 14.5, fontWeight: 'bold' }}>Матриця подібності (Similarity)</span>} style={{ width: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: 13.5, lineHeight: 1.8 }}>
                  s_ii = <b style={{ color: '#389e0d', fontSize: 14.5 }}>1</b> (на діагоналі завжди одиниці)
                  <br />
                  s_ij ∈ [0, 1] або [-1, 1]
                  <br />
                  s_ij = s_ji (симетричність)
                </div>
                <div style={{ marginTop: 12, color: '#595959', fontSize: 12, fontStyle: 'italic', borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
                  * Більше значення означає вищу подібність об'єктів.
                </div>
              </Card>
            </div>
          </div>
        );
      case 18: // Distance Measures
        return (
          <div style={{ marginTop: 16, background: '#fafafa', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#1f1f1f' }}>
              <BulbOutlined style={{ color: '#faad14', fontSize: 18 }} /> Візуалізація: Евклідова vs Манхеттенська відстань
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg 
                viewBox="0 0 380 280" 
                style={{ 
                  width: '100%', 
                  maxWidth: '520px', 
                  height: 'auto', 
                  background: '#fff', 
                  border: '1px solid #e8e8e8', 
                  borderRadius: 8, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'block'
                }}
              >
                <defs>
                  <pattern id="coord-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f5f5f5" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="380" height="240" fill="url(#coord-grid)" />
                
                {/* Axes */}
                <line x1="40" y1="20" x2="40" y2="220" stroke="#8c8c8c" strokeWidth="1.5" />
                <line x1="40" y1="220" x2="360" y2="220" stroke="#8c8c8c" strokeWidth="1.5" />
                
                {/* Axis Labels */}
                <text x="360" y="235" fontSize="13" fill="#262626" fontWeight="bold" textAnchor="end" stroke="#fff" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round">Ознака X₁</text>
                <text x="20" y="25" fontSize="13" fill="#262626" fontWeight="bold" transform="rotate(-90 20 25)" textAnchor="end" stroke="#fff" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round">Ознака X₂</text>

                {/* Point A */}
                <circle cx="90" cy="160" r="8" fill="#1890ff" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0px 2px 4px rgba(24, 144, 255, 0.4))' }} />
                <text x="90" y="142" fontSize="13" fontWeight="bold" fill="#003a8c" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round" textAnchor="middle">A(x₁, y₁)</text>

                {/* Point B */}
                <circle cx="270" cy="70" r="8" fill="#722ed1" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0px 2px 4px rgba(114, 46, 209, 0.4))' }} />
                <text x="270" y="52" fontSize="13" fontWeight="bold" fill="#391085" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round" textAnchor="middle">B(x₂, y₂)</text>

                {/* Euclidean path (red line) */}
                <line x1="90" y1="160" x2="270" y2="70" stroke="#cf1322" strokeWidth="3.5" />
                <text x="180" y="105" fontSize="12" fill="#a8071a" fontWeight="bold" transform="rotate(-26.5 180 105)" textAnchor="middle" stroke="#fff" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">d_E (Евклідова відстань)</text>

                {/* Manhattan path (green dashed steps) */}
                <path d="M 90 160 L 270 160 L 270 70" fill="none" stroke="#135200" strokeWidth="3" strokeDasharray="5 3" />
                <text x="180" y="180" fontSize="12" fill="#135200" fontWeight="bold" textAnchor="middle" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">Δx = |x₂ - x₁|</text>
                <text x="282" y="120" fontSize="12" fill="#135200" fontWeight="bold" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">Δy = |y₂ - y₁|</text>

                {/* Legend container */}
                <rect x="0" y="240" width="380" height="40" fill="#fafafa" stroke="#e8e8e8" strokeWidth="1" />
                
                {/* Legend Items */}
                <line x1="25" y1="260" x2="55" y2="260" stroke="#cf1322" strokeWidth="3" />
                <text x="62" y="264" fontSize="12" fill="#262626" fontWeight="bold">Евклідова (пряма)</text>

                <line x1="205" y1="260" x2="235" y2="260" stroke="#135200" strokeWidth="3" strokeDasharray="5 3" />
                <text x="242" y="264" fontSize="12" fill="#262626" fontWeight="bold">Манхеттенська (сітка)</text>
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Convert raw markdown answers to beautifully formatted elements (lists, math, tables)
  const renderFormattedContent = (content, questionId) => {
    if (!content) return null;

    const lines = content.split('\n');
    const blocks = [];
    
    let currentList = null;
    let currentTable = null;

    const flushList = () => {
      if (currentList) {
        blocks.push({ type: 'list', data: currentList });
        currentList = null;
      }
    };

    const flushTable = () => {
      if (currentTable) {
        blocks.push({ type: 'table', data: currentTable });
        currentTable = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // 1. Detect and parse markdown tables
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        const cells = line.split('|').map(c => c.trim()).slice(1, -1);
        
        if (cells.every(c => c.startsWith('---') || c.startsWith(':---') || c.endsWith('---'))) {
          continue; // Skip the markdown separator line
        }

        if (!currentTable) {
          currentTable = { headers: cells, rows: [] };
        } else {
          currentTable.rows.push(cells);
        }
        continue;
      } else {
        flushTable();
      }

      // 2. Detect and parse lists
      const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
      if (listMatch) {
        const indent = listMatch[1].length;
        const text = listMatch[3];
        
        if (!currentList) {
          currentList = [];
        }
        currentList.push({ indent, text });
        continue;
      } else {
        if (trimmed === '' && i + 1 < lines.length && lines[i + 1].trim().match(/^([-*]|\d+\.)/)) {
          continue; // Keep the list block open if next line is a list item
        }
        flushList();
      }

      // 3. Detect block math ($$ ... $$)
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        const mathContent = trimmed.slice(2, -2).trim();
        blocks.push({ type: 'blockMath', text: mathContent });
        continue;
      }

      // 4. Standalone paragraph
      if (trimmed !== '') {
        blocks.push({ type: 'paragraph', text: line });
      }
    }

    flushList();
    flushTable();

    // Helper to translate LaTeX symbols to beautiful readable Unicode
    const translateMath = (mathStr) => {
      let result = mathStr;

      // Translate specific words/phrases before generic substitutions
      result = result
        .replace(/\\bar\{x\}/g, 'x̄')
        .replace(/\\bar\{y\}/g, 'ȳ')
        .replace(/_\{total\}/g, 'заг')
        .replace(/_\{between\}/g, 'між')
        .replace(/_\{within\}/g, 'внутр')
        .replace(/_\{crit\}/g, 'крит')
        .replace(/t_\{crit\}/g, 't_крит')
        .replace(/F_\{crit\}/g, 'F_крит')
        .replace(/\\hat\{y\}_i/g, 'ŷᵢ');

      // Fractions \frac{a}{b} -> (a) / (b)
      result = result.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)');
      
      // Math operators
      result = result.replace(/\\sum_\{([^{}]+)\}/g, '∑$1')
                     .replace(/\\sum/g, '∑')
                     .replace(/\\cdot/g, '·')
                     .replace(/\\in/g, '∈')
                     .replace(/\\{/g, '{')
                     .replace(/\\}/g, '}')
                     .replace(/\\beta_0/g, 'β₀')
                     .replace(/\\beta_1/g, 'β₁')
                     .replace(/\\beta_2/g, 'β₂')
                     .replace(/\\beta_k/g, 'βₖ')
                     .replace(/\\beta_j/g, 'βⱼ')
                     .replace(/\\beta/g, 'β')
                     .replace(/\\alpha/g, 'α')
                     .replace(/\\mu_1/g, 'μ₁')
                     .replace(/\\mu_2/g, 'μ₂')
                     .replace(/\\mu_k/g, 'μₖ')
                     .replace(/\\mu/g, 'μ')
                     .replace(/\\rho/g, 'ρ')
                     .replace(/\\varepsilon/g, 'ε')
                     .replace(/\\chi\^2/g, 'χ²')
                     .replace(/\\sqrt/g, '√')
                     .replace(/\\to/g, '→')
                     .replace(/\\min/g, 'min')
                     .replace(/\\max/g, 'max')
                     .replace(/\\neq/g, '≠')
                     .replace(/\\ge/g, '≥')
                     .replace(/\\le/g, '≤')
                     .replace(/\\times/g, '×')
                     .replace(/\\circ/g, '°')
                     .replace(/\\text\{C\}/g, 'C')
                     .replace(/\\text\{[^{}]+\}/g, (m) => m.slice(6, -1));

      // Unicode translator for subscripts
      const toSubscript = (str) => {
        const chars = {
          '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
          '+':'₊','-':'₋','=':'₌','(':'₍',')':'₎',
          'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ','p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ','y':'ᵧ',
          'C':'꜀', 'E':'ₑ', 'M':'ₘ', 'P':'ₚ'
        };
        return str.split('').map(c => chars[c] || c).join('');
      };

      // Unicode translator for superscripts
      const toSuperscript = (str) => {
        const chars = {
          '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
          '+':'⁺','-':'⁻','=':'╜','(':'⁽',')':'⁾',
          'n':'ⁿ','i':'ⁱ','p':'ᵖ','r':'ʳ','k':'ᵏ'
        };
        return str.split('').map(c => chars[c] || c).join('');
      };

      // Convert subscript blocks e.g. _{ik} -> ᵢₖ
      result = result.replace(/_\{([^{}]+)\}/g, (match, p1) => toSubscript(p1));
      // Convert single subscripts e.g. _i -> ᵢ
      result = result.replace(/_([a-zA-Z0-9])/g, (match, p1) => toSubscript(p1));

      // Convert superscript blocks e.g. ^{2} -> ²
      result = result.replace(/\^\{([^{}]+)\}/g, (match, p1) => toSuperscript(p1));
      // Convert single superscripts e.g. ^2 -> ²
      result = result.replace(/\^([a-zA-Z0-9])/g, (match, p1) => toSuperscript(p1));

      // Clean up parentheses, double spaces, and remaining backslashes
      result = result.replace(/\(\(([^()]+)\)\)/g, '($1)');
      result = result.replace(/\\/g, '');

      return result;
    };

    // Parse inline tokens like $...$, **...**, `...` and handle <br> tags
    const parseInline = (text) => {
      if (!text) return '';
      
      // Handle HTML line breaks
      if (text.includes('<br>') || text.includes('<br/>') || text.includes('<br />')) {
        const lines = text.split(/<br\s*\/?>/i);
        return lines.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {parseInline(line)}
          </React.Fragment>
        ));
      }

      // Group 1: **bold** (nested content in Group 2)
      // Group 3: *italic* (nested content in Group 4)
      // Group 5: `code`   (nested content in Group 6)
      // Group 7: $math$   (nested content in Group 8)
      const regex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\$([^$]+)\$)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }

        if (match[1]) {
          parts.push(<strong key={match.index}>{parseInline(match[2])}</strong>);
        } else if (match[3]) {
          parts.push(<em key={match.index}>{parseInline(match[4])}</em>);
        } else if (match[5]) {
          parts.push(
            <code 
              key={match.index} 
              style={{ 
                fontFamily: 'SFMono-Regular, Consolas, Courier, monospace', 
                background: '#f5f5f5', 
                padding: '2px 6px', 
                borderRadius: 4, 
                border: '1px solid #e8e8e8', 
                fontSize: '0.88em',
                color: '#c41d7f'
              }}
            >
              {match[6]}
            </code>
          );
        } else if (match[7]) {
          parts.push(
            <span 
              key={match.index} 
              style={{ 
                fontFamily: 'Georgia, serif', 
                fontStyle: 'italic', 
                background: '#fafafa', 
                padding: '0 4px', 
                borderRadius: 3, 
                color: '#cf1322',
                fontWeight: 600
              }}
            >
              {translateMath(match[8])}
            </span>
          );
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      return parts;
    };

    const renderList = (items) => {
      return (
        <ul style={{ paddingLeft: 20, margin: '8px 0', listStyleType: 'disc' }}>
          {items.map((item, idx) => {
            const style = item.indent > 0 ? { marginLeft: item.indent * 12, listStyleType: 'circle' } : {};
            return (
              <li key={idx} style={{ marginBottom: 6, lineHeight: 1.5, ...style }}>
                {parseInline(item.text)}
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <div style={{ padding: '4px 8px', color: '#262626' }}>
        {blocks.map((block, idx) => {
          if (block.type === 'paragraph') {
            const trimmed = block.text.trim();
            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
              return (
                <Title 
                  level={5} 
                  key={idx} 
                  style={{ marginTop: 16, marginBottom: 8, color: '#000', fontWeight: 600 }}
                >
                  {parseInline(trimmed.slice(2, -2))}
                </Title>
              );
            }
            return (
              <Paragraph key={idx} style={{ marginBottom: 12, lineHeight: 1.6, fontSize: 14.5 }}>
                {parseInline(block.text)}
              </Paragraph>
            );
          }
          
          if (block.type === 'list') {
            return <div key={idx}>{renderList(block.data)}</div>;
          }

          if (block.type === 'blockMath') {
            return (
              <div 
                key={idx} 
                style={{ 
                  margin: '18px 0', 
                  textAlign: 'center', 
                  background: '#fafafa', 
                  padding: '14px 20px', 
                  borderRadius: 8, 
                  borderLeft: '4px solid #1890ff',
                  fontFamily: 'Georgia, serif', 
                  fontSize: 16.5,
                  fontStyle: 'italic',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.01)'
                }}
              >
                {parseInline('$' + block.text + '$')}
              </div>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={idx} style={{ margin: '18px 0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: 8, overflow: 'hidden', border: '1px solid #e8e8e8' }}>
                  <thead>
                    <tr style={{ background: '#fafafa' }}>
                      {block.data.headers.map((h, i) => (
                        <th key={i} style={{ padding: '10px 14px', borderBottom: '2px solid #e8e8e8', borderRight: '1px solid #e8e8e8', textAlign: 'left', fontWeight: 600, fontSize: 13.5, background: '#f5f5f5' }}>
                          {parseInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '10px 14px', borderBottom: '1px solid #e8e8e8', borderRight: '1px solid #e8e8e8', fontSize: 13.5 }}>
                            {parseInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          return null;
        })}
        {renderVisualAid(questionId)}
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
        <Text strong style={{ fontSize: 14.5 }}>{q.title.replace(/^\d+\.\s+/, '')}</Text>
      </Space>
    ),
    children: renderFormattedContent(q.answer, q.id),
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
