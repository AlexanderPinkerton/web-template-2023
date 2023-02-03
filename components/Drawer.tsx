import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
const drawerWidth = 280;

interface Props {
    open: boolean
}

export default function ClippedDrawer(props: Props) {
    const [managementOpen, setManagementOpen] = React.useState(true);

    const toggleManagement = () => {
        setManagementOpen(!managementOpen);
    };

    return (
        <Drawer
            disableScrollLock={true}
            disableEnforceFocus={true}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            open={props.open}
            hideBackdrop={true}
        >
            <Toolbar />
            <Grid xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingBottom: '10px' }}>
                <List>
                    <Link href={`/`}                    >
                        <ListItem key={"Nav Item 1"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AutoAwesomeMosaicIcon />
                                </ListItemIcon>
                                <ListItemText role='menuitem' primary={"Nav Item 1"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                </List>
            </Grid>
        </Drawer>
    );
}
