import React from "react";

import { Route, Switch } from "react-router-dom";
import Revenue from "../container/Admin/pages/Revenue";
import Accounts from "../container/Admin/pages/Account";
import Categorys from "../container/Admin/pages/Category";
import Foods from "../container/Admin/pages/Food";
import Settings from "../container/Admin/pages/Setting";
import AnotherSettings from "../container/Admin/pages/AnotherSetting";
import InfoAdmin from "../container/Admin/pages/infoadmin";
import EditCategory from "../container/Admin/pages/UpdateCategory";
import EditFood from "../container/Admin/pages/UpdateFood";

const RoutesAdmin = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={Revenue} />
      <Route path="/admin/accounts" component={Accounts} />
      <Route path="/admin/categorys" component={Categorys} />
      <Route path="/admin/foods" component={Foods} />
      <Route path="/admin/settings" component={Settings} />
      <Route path="/admin/anothersettings" component={AnotherSettings} />
      <Route path="/admin/info" component={InfoAdmin} />
      <Route path="/admin/editCategory" component={EditCategory} />
      <Route path="/admin/editFood" component={EditFood} />
    </Switch>
  );
};

export default RoutesAdmin;
