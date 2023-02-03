import { render, screen } from '@testing-library/react'
import ClippedDrawer from '../../components/Drawer'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes'

describe('Drawer', () => {
  it('Drawer renders and has menuitems', async () => {
    
    render(
      <ThemeProvider theme={lightTheme}>
        <ClippedDrawer open={true} />
      </ThemeProvider>
    )

    const menuDashboardOption = screen.getByRole('menuitem', {name: /Dashboard/i})

    expect(menuDashboardOption).toBeInTheDocument()
  })
})