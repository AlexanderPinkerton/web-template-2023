import { RootStore } from "../../modules/Stores/RootStore";
import { ALERT_SEVERITY } from "../../enums"
import SidebarLayout from '../../layouts/SidebarLayout';
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes'
import { RootStoreContext } from '../../pages/_app'
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
      asPath: '/'
      // ... whatever else you you call on `router`
    };
  },
}));

describe('Snackbar Error Alert Tests', () => {
  test('Errors should populate alert snackbar with the passed message', async () => {
    let rs = new RootStore()
    let es = rs.errorStore

    render(
      <RootStoreContext.Provider value={rs}>
        <ThemeProvider theme={lightTheme}>
          <SidebarLayout>
          </SidebarLayout>
        </ThemeProvider>
      </RootStoreContext.Provider>)
    const errorMsg = "this is a test error"
    await act(async () => es.addError(errorMsg, ALERT_SEVERITY.error))
    const errComponent = screen.getByText(errorMsg)
    expect(errComponent.innerHTML).toBe(errorMsg)
  })
})