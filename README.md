## Start the application

Run `npx nx serve <project_name>` to start the development server.

## Build for production

Run `npx nx build <project_name>` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Lint project

`npx nx lint <project_name> --fix` `--fix` - automatic problem correction

## Create component (or use NX plugin)

`npx nx g @nx/angular:component <component_name>` `--standalone`
