import React, { Fragment, useState } from 'react'
import { Menu } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import './Sidebar.less'

const { SubMenu } = Menu

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1879916_mvuxu6gr6oq.js',
  });

function Sidebar(props) {

    const [openKeys, setOpenKeys] = useState('')
    const pathname = props.location.pathname.split('/')

    const handleOpenSub = (path) => {
        if (path !== openKeys) {
            setOpenKeys(path)
            sessionStorage.setItem('', path)
        } else {
            setOpenKeys('')
            sessionStorage.setItem('', '')
        }
    }

    const permissions = sessionStorage.getItem('permissions') ? JSON.parse(sessionStorage.getItem('permissions')).filter(permission => permission !== null) : []
    const defaultSelectedKeys = sessionStorage.getItem('redirect')

    return (
        <Fragment>
            <div className="logo">
                <Link to={defaultSelectedKeys}>
                    {
                        props.collapsed ? (
                            <img src={ require('../assets/img/logo-small.png') } alt="Sanoh Logo" />
                        ) : (
                            <img src={ require('../assets/img/logo.png') } alt="Sanoh Logo" />
                        )
                    }
                </Link>
            </div>
            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={defaultSelectedKeys}
                className="sidebar"
                selectedKeys={pathname}
                openKeys={[ sessionStorage.getItem('openKeys') ? sessionStorage.getItem('openKeys') : openKeys ]}
            >
                {
                    permissions && permissions.length > 0 && permissions.map(permission => {
                        return ( permission.children && permission.children.length > 0 ? (
                            <SubMenu
                                key={permission.url}
                                onTitleClick={() => handleOpenSub(permission.url)}
                                title={
                                    <span>
                                        <IconFont style={{fontSize:20}} type={permission.icon} />
                                        <span>{permission.name}</span>
                                    </span>
                                }>
                                    {
                                        permission.children && permission.children.map(child => {
                                            return child && (
                                                <Menu.Item
                                                    key={child.url}
                                                    >
                                                        <Link to={`/${child.url}`}>{child.name}</Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                                
                            ) : (
                                <Menu.Item
                                    key={permission.url}
                                    >
                                        <Link to={`/${permission.url}`}>
                                            <IconFont style={{fontSize:20}} type={permission.icon} />
                                            <span>{permission.name}</span>
                                        </Link>
                                </Menu.Item>
                            )
                        )
                    })
                }
               
            </Menu>
        </Fragment>
    )
}

export default Sidebar
