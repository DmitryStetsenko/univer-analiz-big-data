import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Breadcrumb } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalculatorOutlined,
  NodeIndexOutlined,
  ClusterOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const NavigationLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <CalculatorOutlined />,
      label: 'Лабораторна №1 (Міри близькості)',
    },
    {
      key: '/lab2',
      icon: <NodeIndexOutlined />,
      label: 'Лабораторна №2 (Найближчий сусід)',
    },
    {
      key: '/lab3',
      icon: <ClusterOutlined />,
      label: 'Лабораторна №3 (Найдальший сусід)',
    },
    {
      key: '/theory',
      icon: <BookOutlined />,
      label: 'Теорія: Вижимка лекцій',
    },
    {
      key: '/exam',
      icon: <QuestionCircleOutlined />,
      label: 'Екзаменаційні питання',
    },
  ];

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [{ title: 'Аналіз великих даних' }];
    const match = menuItems.find(item => item.key === path);
    if (match) {
      items.push({ title: match.label });
    }
    return items;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 10,
        }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 12,
          overflow: 'hidden'
        }}>
          <BarChartOutlined style={{ fontSize: 24, color: '#1677ff' }} />
          {!collapsed && (
            <span style={{ 
              color: '#fff', 
              fontWeight: 700, 
              fontSize: 16,
              whiteSpace: 'nowrap',
              background: 'linear-gradient(90deg, #1677ff, #722ed1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              BigData Lab App
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 9,
            boxShadow: '0 1px 4px rgba(0,21,41,.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <div style={{ fontWeight: 600, color: '#8c8c8c' }}>
            Варіант 1 • Студентський Проєкт
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto'
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center', color: '#bfbfbf', background: '#f5f5f5' }}>
          Курс "Аналіз та обробка великих даних" © 2026 • Розроблено з використанням Ant Design & Zustand
        </Footer>
      </Layout>
    </Layout>
  );
};
