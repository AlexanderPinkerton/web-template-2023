import type { NextPage } from 'next'
import { observer } from "mobx-react-lite"
import Grid from '@mui/material/Unstable_Grid2';

const MainContent: NextPage = () => {
  return (
    <Grid container spacing={2}>
      stuff
    </Grid>
  )
}

export default observer(MainContent)
