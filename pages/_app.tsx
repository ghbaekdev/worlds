import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/global-style';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import Layout from '../components/Layout/Layout';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
