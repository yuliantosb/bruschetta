import React, { useState } from 'react'
import { Input, Tabs, Button, message, Form } from 'antd'
import { UserOutlined, LockOutlined, RedoOutlined } from '@ant-design/icons'
import QrReader from 'react-qr-reader'
import Axios from 'axios'
import { url } from '../../global'
import './Login.less'

const { TabPane } = Tabs

function Login(props) {
    
    const [tab, setTab] = useState('1')
    const [success, setSuccess] = useState(true)
    const [login, setLogin] = useState({username: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleScan = async (value) => {
        if (value !== null) {
            await Axios.post(`${url}/login-qr`, {
                username: value,
            }).then(res => {

                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('fullname', res.data.data.full_name)
                sessionStorage.setItem('avatar', res.data.data.photo ? res.data.data.photo_url : '')
                sessionStorage.setItem('permissions', JSON.stringify(res.data.permissions))
                sessionStorage.setItem('redirect', res.data.redirect)

                message.success(res.data.message)
                setLoading(false)
                props.history.push(res.data.redirect)

            }).catch(err => {
                message.error(err.response.data.message)
                setSuccess(false)
            })
        }
    }

    const handleChange = (name, value) => {
        setError(null)
        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleError = (err) => {
        console.log(err)
    }

    const handleTab = (key) => {
        setTab(key)
    }

    const handleRetry = () => {
        setSuccess(true)
    }

    const handleLogin = async () => {
        setLoading(true)
        await Axios.post(`${url}/login`, {
            username: login.username,
            password: login.password
        }).then(res => {

            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('fullname', res.data.data.full_name)
            sessionStorage.setItem('avatar', res.data.data.photo ? res.data.data.photo_url : '')
            sessionStorage.setItem('permissions', JSON.stringify(res.data.permissions))
            sessionStorage.setItem('redirect', res.data.redirect)

            message.success(res.data.message)
            setLoading(false)
            props.history.push(res.data.redirect)

        }).catch(err => {
            message.error(err.response.data.message)
            setLoading(false)
            if (err.response.status === 422) {
                setError(err.response.data.errors)
            }
        })
    }

    return (
            <div className="main">
                <div>
                    <img src={require('../../assets/img/logo.svg')} className="img-logo" alt="Sanoh"/>
                    <Tabs activeKey={tab} onChange={handleTab}>
                        <TabPane tab="Sign In" key="1">
                            <Form onFinish={handleLogin}>

                                <Form.Item
                                    validateStatus={error && error.username ? 'error' : false }
                                    help={error && error.username ? error.username[0] : false }
                                    >
                                    <Input
                                        className="login-input"
                                        prefix={<UserOutlined />}
                                        placeholder="Username"
                                        onChange={(e) => handleChange('username', e.target.value)}
                                        value={login.username}

                                    />
                                </Form.Item>
                                <Form.Item
                                    validateStatus={error && error.password ? 'error' : false }
                                    help={error && error.password ? error.password[0] : false }
                                    >
                                        <Input 
                                            className="login-input"
                                            prefix={<LockOutlined />}
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            value={login.password}
                                        />
                                    </Form.Item>
                                <div>
                                    <Button htmlType="submit" loading={loading} type="primary" className="button-login">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign in with QR" key="2">
                            {
                                tab === '2' && success ? (
                                    <QrReader
                                        delay={100}
                                        onError={handleError}
                                        onScan={handleScan}
                                        className="qrcode"
                                        showViewFinder={false}
                                        />
                                ) : (
                                    
                                    <div className="qrcode-fail">
                                        <p>Login Failed</p>
                                        <p>Retry</p>
                                        <Button type="link" size="large" onClick={handleRetry}><RedoOutlined /></Button>
                                    </div>
                                    
                                )
                            }
                        </TabPane>
                    </Tabs>
                </div>
            </div>
    )
}

export default Login