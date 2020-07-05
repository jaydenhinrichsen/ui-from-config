import * as React from 'react'
import { ConfigComponent, ImportedComponents, DynamicComponentProps } from './types';
// Paths to components come from frontend
const COMPONENT_PATHS: {[x: string]: string} = {
  'Person': './Person',
}

const importComponents = (config: ConfigComponent[]) => {
  const components: ImportedComponents = {};

  // Load the required component files by mapping over config recursively then lazy loading the module.
  const load = (_config: ConfigComponent[], _components: ImportedComponents) => {
    _config.forEach(configEntry => {
      const { component, children } = configEntry;

      // Only load the module if it we haven't loaded it already
      if (!_components[component]) {
        _components[component] = React.lazy(() => import(`${COMPONENT_PATHS[component]}`));
      }

      // If this component has 'children', we need to check those components as well
      if (children) {
        Object.assign(_components, load(children, _components));
      }
    });

    return _components;
  };

  return load(config, components);
}

const DynamicComponents = (props: DynamicComponentProps) => {
  const { config } = props;
  const importedComponents: ImportedComponents = importComponents(config);

  // Render the entire config 'structure' using our lazy loaded modules
  const render = (configEntry: ConfigComponent) => {
    // The react component that has been lazy loaded
    const Component = importedComponents[configEntry.component];
    
    // Render children if they exist
    if (configEntry.children) {
      const children = configEntry.children.map(render);
      return (
        <React.Suspense key={configEntry.id} fallback={<div>Loading</div>}>
          <Component key={configEntry.id} {...configEntry.props}>
            {children}
          </Component>
        </React.Suspense>
      );
    }

    return(
      <React.Suspense key={configEntry.id} fallback={<div>Loading</div>}>
        <Component key={configEntry.id} {...configEntry.props} />
      </React.Suspense>
    );
  };

  const components = config.map(render);
  return <React.Fragment>{components}</React.Fragment>
}

export default DynamicComponents