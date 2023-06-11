import { HomeOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from "react"

export const NavBar = () => {
    const [current, setCurrent] = useState('');

    const items = [
        {
            label: <Link to="/guidelines">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: "Contact Us",
            key: 'contact',
            icon: <MailOutlined />,
          },
      ];

      const onClick = (event) => {
        setCurrent(event.key);
      };
    
      return (
        <nav>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <br /> 
        </nav>
      )
}