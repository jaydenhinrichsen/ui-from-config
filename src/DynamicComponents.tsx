import React, { lazy, Suspense } from 'react'

interface IConfigComponent {
  id: string;
  component: string;
  props: {
    template: string;
    [x: string]: string;
  },
  children: IConfigComponent[]
}

interface IDynamicComponentsProps {
  config: IConfigComponent[];
}

// Paths to components come from frontend
const COMPONENT_PATHS: any = {
  'Person': './Person',
}

interface IDynamicComponents {
  [x: string]: React.LazyExoticComponent<React.ComponentType<any>>;
}

const importedComponents = (config: IConfigComponent[]) => {
  const components: IDynamicComponents = {}
  const load = (_config: IConfigComponent[], _components: IDynamicComponents) => {
    for(let i = 0; i < _config.length; i++) {
      _components[_config[i].component] = lazy(() => import(`${COMPONENT_PATHS[_config[i].component]}`))
      if (_config[i].children) {
        Object.assign(_components, load(_config[i].children, _components));
      }
    }
    return _components;
  };

  return load(config, components);
}

const DynamicComponents = (props: IDynamicComponentsProps) => {
  const config = props.config;
  const Components: IDynamicComponents = importedComponents(config)
  const render = (c: IConfigComponent, i: number, _config: IConfigComponent[]) => {
    const Component = Components[c.component]
    if (_config[i].children) {
      const children = _config[i].children.map((child, j) => render(child, j, _config[i].children));
      return <Suspense key={c.id} fallback={<div>Loading</div>}><Component key={c.id} {...c.props}>{children}</Component></Suspense>
    } else {
      return <Suspense key={c.id} fallback={<div>Loading</div>}><Component key={c.id} {...c.props} /></Suspense>
    }
  }
  const components = config.map((c, i,) => render(c, i, config))
  return <div>{components}</div>
}

export default DynamicComponents