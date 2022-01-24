import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import {useAuth} from '../hooks/useAuth'
import {auth} from '../config/firebase';
import {title} from '../constants'


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page:string|null) => {
    setAnchorElNav(null);
    if(!page) return;
    navigate("/" + page)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    auth.signOut()
}

  const {isAuthenticated, user} = useAuth()
  const pages = ['Workouts', 'Exercises', 'Progress'];
  const settings = ['Profile', 'Logout'];
  
  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex', cursor:"pointer" } }}
          >
            {title}
          </Typography>

         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                isAuthenticated ?
                pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )) :
                  <MenuItem onClick={() => handleCloseNavMenu("exercises")}>
                    <Typography textAlign="center">Exercises</Typography>
                  </MenuItem>
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', cursor:"pointer" } }}
          >
            {title}
          </Typography>
    
         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
            isAuthenticated ? 
            pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            )) : 
            <Button
                onClick={() => handleCloseNavMenu("exercises")}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Exercises
              </Button>
          }
          </Box>

         {isAuthenticated &&  <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  user &&
                  <Avatar alt={user.displayName} src={user.photoURL} />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if(setting === "Logout"){
                  return (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography textAlign="center">{setting}</Typography>
                   </MenuItem>
                  )
                }
                return (
                  <MenuItem key={setting} onClick={() => handleCloseNavMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                 </MenuItem>
                )
              })}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
