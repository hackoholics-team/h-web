import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from "react-router-dom";
import { Layout } from './layout';
import { LoginPage } from './security/components';
import { hackoholicDarkTheme, hackoholicLightTheme } from './themes';
import { dataProvider, authProvider } from './providers';
import { i18nProvider } from './providers/i18n';
import { DUMMY_UI } from './operations/dummies';
import { ProfileShow } from './operations/profiles';

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
    <Resource name="profiles" />
    <Resource name="dummies" {...DUMMY_UI} />

    <CustomRoutes>
      <Route element={<ProfileShow />} path="/profiles" />
    </CustomRoutes>
  </Admin>
);

export default Dashboard;
