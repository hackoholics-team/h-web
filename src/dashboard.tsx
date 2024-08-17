import { Admin, Authenticated, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { Layout, NoLayout } from './layout';
import { LoginPage } from './security/components';
import { ProfileShow } from './operations/profiles';
import { CompleteInfoPage } from './security/components/complete-info/complete-info-page';
import { Settings } from './operations/settings';
import { Home } from './operations/home';
import { Preferencies } from './operations/preferencies';
import { hackoholicDarkTheme, hackoholicLightTheme } from './themes';
import { dataProvider, authProvider, firebaseAuthProvider } from './providers';
import { i18nProvider } from './providers/i18n';
import { DUMMY_UI } from './operations/dummies';

const Dashboard = () => (
  <Admin
    title="hackoholic"
    defaultTheme="light"
    layout={Layout}
    dashboard={Home}
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
      <Route
        element={
          <Authenticated>
            <ProfileShow />
          </Authenticated>
        }
        path="/profiles"
      />
      <Route
        element={
          <Authenticated>
            <Settings />
          </Authenticated>
        }
        path="/settings"
      />
    </CustomRoutes>
    <CustomRoutes noLayout>
      <Route
        path="/preferencies"
        element={
          <NoLayout>
            <Preferencies />
          </NoLayout>
        }
      />
      <Route
        element={
          <NoLayout>
            <CompleteInfoPage />
          </NoLayout>
        }
        path="/register"
      />
    </CustomRoutes>
  </Admin>
);

export default Dashboard;
