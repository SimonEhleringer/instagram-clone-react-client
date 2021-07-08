import { Route, Switch } from 'react-router-dom';
import {
  renderIndexRoute,
  renderLoginRoute,
  renderMyProfileRoute,
  renderNewPostRoute,
  renderRegisterRoute,
  renderSuggestionsRoute,
  renderUserProfileRoute,
} from '../../routes/renderers';
import Header from '../../shared/Header';

const Routes = () => {
  return (
    <Switch>
      {renderLoginRoute()}
      {renderRegisterRoute()}
      <Route>
        <Header />
        <Switch>
          {renderIndexRoute()}
          {renderSuggestionsRoute()}
          {renderNewPostRoute()}
          {renderMyProfileRoute()}
          {renderUserProfileRoute()}
        </Switch>
      </Route>
    </Switch>
  );
};

export default Routes;
