import { HomePage } from './pages';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider>
      <HomePage />
    </ConfigProvider>
  );
}

export default App;
