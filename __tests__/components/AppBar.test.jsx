import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GlobalAppBar from '../../components/AppBar'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes'
import { APP_NAME } from '../../constants'

describe('AppBar', () => {
  it('AppBar renders and has a clickable toggle button', async () => {

  const toggleDrawer = jest.fn()

    render(
      <ThemeProvider theme={lightTheme}>
        <GlobalAppBar toggleDrawer={toggleDrawer} />
      </ThemeProvider>
    )

    const heading = screen.getByText(APP_NAME)
    const toggleButton = screen.getByLabelText('menu')

    expect(heading).toBeInTheDocument()
    expect(toggleButton).toBeInTheDocument()
 
    await userEvent.click(toggleButton)

    expect(toggleDrawer).toBeCalled()
  })
})