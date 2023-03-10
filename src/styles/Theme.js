import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#ee7933',
      darker: '#ee79335',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
