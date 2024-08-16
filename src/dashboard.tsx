import { Admin, Authenticated, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { Layout } from './layout';
import { LoginPage } from './security/components';
import { ProfileShow } from './operations/profiles';
import { PdfViewer } from './common/components';
import { hackoholicDarkTheme, hackoholicLightTheme } from './themes';
import { dataProvider, authProvider } from './providers';
import { i18nProvider } from './providers/i18n';
import { DUMMY_UI } from './operations/dummies';
import { CompleteInfoPage } from './security/components/complete-info/complete-info-page';
import { Settings } from './operations/settings';
import { Home } from './operations/home';

const Dashboard = () => (
  <Admin
    requireAuth={false}
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
      <Route
        element={<PdfViewer pdf={'http://localhost:5173/test.pdf'} />}
        path="/pdf"
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
