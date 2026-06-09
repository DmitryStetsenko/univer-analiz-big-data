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
