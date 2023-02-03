import * as React from 'react'
import { CustomAppBar } from '../components/AppBar'
import ClippedDrawer from '../components/Drawer'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { RootStoreContext } from '../pages/_app'
import { AlertColor } from '@mui/material/Alert'
import { observer } from 'mobx-react-lite';

type SidebarLayoutProps = {
  children: React.ReactNode,
};

type MainProps = {
  open?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const drawerWidth = 280;

const Main = styled('main')<MainProps>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: 64,
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

function SidebarLayout({ children }: SidebarLayoutProps) {
  // Snackbar Alert Functions
  const rootStore = React.useContext(RootStoreContext)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    rootStore.errorStore.deactivateError()
  };

  const SnackbarAlertDisplay = observer(() => {
    if (!rootStore.errorStore.activeError) {
      return null
    }
    return (
      <Snackbar open={!!rootStore.errorStore.activeError} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={rootStore.errorStore.activeError.severity as AlertColor} sx={{ width: '100%' }}>
          {rootStore.errorStore.activeError.message}
        </Alert>
      </Snackbar>
    )
  })

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar toggleDrawer={toggleDrawer} />
      <ClippedDrawer open={isDrawerOpen} />
      <Main open={isDrawerOpen}>
        <Container maxWidth='lg'>
          {children}
        </Container>
        <SnackbarAlertDisplay />
      </Main>
    </Box>
  );
}

export default observer(SidebarLayout)