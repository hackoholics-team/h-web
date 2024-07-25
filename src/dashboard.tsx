import { Admin, Resource } from 'react-admin';
import { Layout } from './layout';
import { LoginPage } from './security/components';
import { hackoholicDarkTheme, hackoholicLightTheme } from './themes';
import { dataProvider, authProvider } from './providers';
import { i18nProvider } from './providers/i18n';
import { DUMMY_UI } from './operations/dummies';

const Dashboard = () => (
  <Admin
    requireAuth
    title="hackoholic"
    defaultTheme="light"
    layout={Layout}
    loginPage={LoginPage}
    i18nProvider={i18nProvider}
    lightTheme={hackoholicLightTheme}
    darkTheme={hackoholicDarkTheme}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <Resource name="dummies" {...DUMMY_UI} />
  </Admin>
);

export default Dashboard;
