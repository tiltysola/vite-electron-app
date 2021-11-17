import { Switch, Route, Redirect } from 'react-router-dom';

import Welcome from '@/pages/welcome';
import ExampleIpcRenderer from '@/pages/example/ipcrenderer';
import ExampleRequest from '@/pages/example/request';
import Notfound from '@/pages/notfound';

const Index = () => {
  return (
    <Switch>
      <Redirect from="/" to="/welcome" exact />
      <Route path="/welcome" component={Welcome} exact />
      <Route path="/example/ipcrenderer" component={ExampleIpcRenderer} exact />
      <Route path="/example/request" component={ExampleRequest} exact />
      <Route path="*" component={Notfound} />
    </Switch>
  );
};

export default Index;
