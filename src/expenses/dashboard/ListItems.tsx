import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { NavLink, NavLinkProps } from 'react-router-dom'

export const StyledNavLink: React.FC<NavLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <NavLink style={{ textDecoration: 'none', color: 'unset' }} {...props}>
      {children}
    </NavLink>
  )
}

export default function ListItems() {
  const [active, setActive] = React.useState('dashboard')
  const toggleActiveTab = (tab: string) => () => {
    setActive(tab)
  }
  return (
    <React.Fragment>
      <StyledNavLink to="dashboard" onClick={toggleActiveTab('dashboard')}>
        <ListItemButton {...(active === 'dashboard' ? { selected: true } : {})}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink to="mymoney" onClick={toggleActiveTab('mymoney')}>
        <ListItemButton {...(active === 'mymoney' ? { selected: true } : {})}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Meu dinheiro" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink to="myaccount" onClick={toggleActiveTab('myaccount')}>
        <ListItemButton {...(active === 'myaccount' ? { selected: true } : {})}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
        </ListItemButton>
      </StyledNavLink>
    </React.Fragment>
  )
}
