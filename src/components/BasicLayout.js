import React from 'react';
import { Layout } from 'antd';
import { CopyrightCircleOutlined, HeartFilled } from '@ant-design/icons';
import './BasicLayout.less'

const { Footer } = Layout

export default ({ children }) => <div className="content-basic">{children}<Footer className="footer"><CopyrightCircleOutlined /> 2020 Bruschetta Dibuat dengan <HeartFilled className="text-pink" /> di Karawang</Footer></div>;