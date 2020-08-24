import React from 'react'
import { Menu, Avatar, Space, Dropdown } from 'antd'
import { MenuFoldOutlined, UserOutlined, LogoutOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import './Navbar.less'

function Navbar(props) {
    
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        return props.history.push('/login') 
    }

    return (
        <div className="navbar">
            <div>
                { props.collapsed ? <MenuUnfoldOutlined onClick={props.onToggleCollapsed} /> : <MenuFoldOutlined onClick={props.onToggleCollapsed} /> }
            </div>
            <div>
                <Menu mode="horizontal" className="menu-header">
                    
                    <Menu.Item key="profile">
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="3">
                                    <span onClick={handleLogout}> 
                                        <LogoutOutlined />Logout
                                    </span>
                                </Menu.Item>
                            </Menu>
                        } trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Space>
                                    {
                                        sessionStorage.getItem('avatar') ? (
                                            <Avatar size="small" src={sessionStorage.getItem('avatar')} />
                                        ) : (
                                            <Avatar size="small" icon={<UserOutlined />} />
                                        )
                                    }
                                    { !props.screens.xs && <span> { sessionStorage.getItem('fullname') } </span> }
                                </Space>
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar
