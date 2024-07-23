import { Admin, Resource } from 'react-admin';
import { Layout } from './layout';
import { hackoholicDarkTheme, hackoholicLightTheme } from './hackoholic-theme';
import { dataProvider, authProvider } from './providers';
import { DUMMY_UI } from './operations/dummies';

const Dashboard = () => (
  <Admin
    requireAuth
    title="hackoholic"
    defaultTheme="dark"
    layout={Layout}
    lightTheme={hackoholicLightTheme}
    darkTheme={hackoholicDarkTheme}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="dummies" {...DUMMY_UI} />
  </Admin>
);

export default Dashboard;
