import {Layout, Menu} from 'antd'
import Link from 'next/link'
import style from '../styles/Layout.module.css'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

export default function LayoutGrid({children, title, navbarKey}) {
  return (
    <Layout>
      <Sider theme="light">
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={[navbarKey]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/">
              <a>Сводка</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link href="/products">
              <a>Товары</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link href="/clients">
              <a>Клиенты</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
          <Link href="/orders">
              <a>Заказы</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={style.header} >{title}</Header>
        <Content className={style.content}>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
