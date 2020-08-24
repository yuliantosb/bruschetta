import React, { useState, useEffect, Fragment } from 'react'
import { Layout, Grid } from 'antd';
import { CopyrightCircleOutlined, HeartFilled } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './FullLayout.less';

const { Header, Footer, Sider } = Layout;
const { useBreakpoint } = Grid

function FullLayout(props) {

    const [collapsed, setCollapsed] = useState(false)
    const screens = useBreakpoint();

    const handleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    useEffect(() => {
        // props.screens.xs && setCollapsed(false)
        const width = window.innerWidth
        width <= 500 && setCollapsed(false)
        
    }, [])

    const refresh = () => {
       const path = props.history.location.pathname
       window.location = path
    }

    return (
        <Layout>
            <Sider 
                breakpoint="lg"
                onBreakpoint={broken => {
                    setCollapsed(broken)
                }}
                className={`sidebar ${ !screens.xs ?  collapsed  ? 'sidebar-collapsed' : 'sidebar-uncollapsed' : !collapsed ? 'sidebar-none' : 'sidebar-collapsed'}`} trigger={null} collapsed={collapsed}>
                <Sidebar {...props} collapsed={collapsed} />
            </Sider>
            <Layout>
            <Header className="header">
                <Navbar {...props} refresh={refresh} collapsed={collapsed} screens={screens} onToggleCollapsed={handleCollapsed} />
            </Header>
                <Fragment>
                    {props.children}
                </Fragment>
            <Footer><CopyrightCircleOutlined /> 2020 Bruschetta Dibuat dengan <HeartFilled className="text-pink" /> di Karawang</Footer>
            </Layout>
      </Layout>   
    )
}

export default FullLayout
