import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadChildren: () =>
          import("./../../../../shared/src/index").then(m => m.AuthComponent),
        title: "Вхід",
      },
      {
        path: "project-management",
        loadChildren: () =>
          import(
            "./features/project-management/project-management.routes"
          ).then(m => m.projectManagementRoutes),
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("./features/user-management/user-management.routes").then(
            m => m.userManagementRoutes,
          ),
      },
      {
        path: "role-management",
        loadChildren: () =>
          import("./features/role-management/role-management.routes").then(
            m => m.roleManagementRoutes,
          ),
      },
    ],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./../../../../shared/src/index").then(m => m.Page404Component),
    title: "Сторінка не знайдена",
  },
];
