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

type ListItemsProps = {
  onTabChange: (newTitle: string) => void
}

export default function ListItems({ onTabChange }: ListItemsProps) {
  const [activeTab, setActiveTab] = React.useState('dashboard')
  const onClickListItem = (tabId: string, tabTitle: string) => () => {
    onTabChange(tabTitle)
    setActiveTab(tabId)
  }
  return (
    <React.Fragment>
      <StyledNavLink
        to="dashboard"
        onClick={onClickListItem('dashboard', 'Dashboard')}
      >
        <ListItemButton
          {...(activeTab === 'dashboard' ? { selected: true } : {})}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink
        to="mymoney"
        onClick={onClickListItem('mymoney', 'Meu dinheiro')}
      >
        <ListItemButton
          {...(activeTab === 'mymoney' ? { selected: true } : {})}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Meu dinheiro" />
        </ListItemButton>
      </StyledNavLink>
      <StyledNavLink
        to="myaccount"
        onClick={onClickListItem('myaccount', 'Meu perfil')}
      >
        <ListItemButton
          {...(activeTab === 'myaccount' ? { selected: true } : {})}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
        </ListItemButton>
      </StyledNavLink>
    </React.Fragment>
  )
}
