import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useIntl } from 'react-intl';
import {
  FiGrid,
  FiTruck,
  FiUsers,
  FiMap,
  FiNavigation,
  FiTool,
  FiDroplet,
  FiDollarSign,
  FiBarChart2,
  FiShield
} from 'react-icons/fi';

import '../../styles/layout.css';

const navItems = [
  {
    path: '/dashboard',
    labelId: 'nav.dashboard',
    icon: <FiGrid />,
    roles: ['ADMIN', 'DISPATCHER', 'DRIVER', 'CLIENT']
  },
  {
    path: '/vehicles',
    labelId: 'nav.vehicles',
    icon: <FiTruck />,
    roles: ['ADMIN', 'DISPATCHER', 'DRIVER']
  },
  {
    path: '/drivers',
    labelId: 'nav.drivers',
    icon: <FiUsers />,
    roles: ['ADMIN', 'DISPATCHER']
  },
  {
    path: '/routes',
    labelId: 'nav.routes',
    icon: <FiMap />,
    roles: ['ADMIN', 'DISPATCHER', 'DRIVER', 'CLIENT']
  },
  {
    path: '/trips',
    labelId: 'nav.trips',
    icon: <FiNavigation />,
    roles: ['ADMIN', 'DISPATCHER', 'DRIVER', 'CLIENT']
  },
  {
    path: '/maintenance',
    labelId: 'nav.maintenance',
    icon: <FiTool />,
    roles: ['ADMIN', 'DISPATCHER']
  },
  {
    path: '/fuel-logs',
    labelId: 'nav.fuelLogs',
    icon: <FiDroplet />,
    roles: ['ADMIN', 'DISPATCHER']
  },
  {
    path: '/expenses',
    labelId: 'nav.expenses',
    icon: <FiDollarSign />,
    roles: ['ADMIN', 'DISPATCHER']
  },
  {
    path: '/reports',
    labelId: 'nav.reports',
    icon: <FiBarChart2 />,
    roles: ['ADMIN', 'DISPATCHER']
  },
  {
    path: '/users',
    labelId: 'nav.users',
    icon: <FiShield />,
    roles: ['ADMIN']
  }
];

function Sidebar() {
  const { user } = useAuth();
  const intl = useIntl();

  const visibleItems = navItems.filter(
    item => !item.roles || item.roles.includes(user?.role)
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FiTruck className="sidebar-logo-icon" />
        <h2>{intl.formatMessage({ id: 'app.short' })}</h2>
      </div>

      <nav className="sidebar-nav">
        {visibleItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">
              {intl.formatMessage({ id: item.labelId })}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="role-badge">{user?.role}</span>
      </div>
    </aside>
  );
}

export default Sidebar;