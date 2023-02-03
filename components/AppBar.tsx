import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext, ThemeNames } from '../themes';
import Switch from '@mui/material/Switch';
import { APP_NAME } from '../constants';

interface Props {
    toggleDrawer: React.MouseEventHandler<HTMLButtonElement>;
}

export function CustomAppBar(props: Props) {
    const { theme, toggleTheme } = React.useContext(ThemeContext)
    return (
        <AppBar position="fixed" elevation={0} sx={{ zIndex: theme.zIndex.drawer + 1, backgroundImage: theme.palette.brandColors.mainGradient }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    onClick={props.toggleDrawer}
                    aria-label="menu"
                    sx={{ mr: 2, color: theme.palette.common.white }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.common.white }}>
                {APP_NAME}
                </Typography>
                <Typography sx={{ color: theme.palette.common.white }}>
                    Dark Mode
                    <Switch
                        checked={theme.name == ThemeNames.DARK}
                        onChange={toggleTheme}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
