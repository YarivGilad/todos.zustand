import ReactDOMClient from 'react-dom/client'
import { App } from './view/App/App.view.tsx'
import { GlobalStyle as ResetCSS } from './styles/reset.styles.ts';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
root.render(
  <>
    <ResetCSS />
    <App />
  </>
)