import React, { lazy, Suspense } from 'react'

// Paths to components come from frontend
const COMPONENT_PATHS: any = {
  'Person': './Person',
}

const importedComponents = (config: any) => {
  const components: any = {}
  const load = (_config: any, _components: any) => {
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


const DynamicComponents = (props: any) => {
  const config = props.config;
  const Components = importedComponents(config)
  const render = (c: any, i: any, _config: any) => {
    const Component = Components[c.component]
    if (_config[i].children) {
      const children = _config[i].children.map((child: any, j: any) => render(child, j, _config[i].children));
      return <Suspense key={c.id} fallback={<div>Loading</div>}><Component key={c.id} {...c.props}>{children}</Component></Suspense>
    } else {
      return <Suspense key={c.id} fallback={<div>Loading</div>}><Component key={c.id} {...c.props} /></Suspense>
    }
  }
  const components = config.map((c: any, i: any) => render(c, i, config))
  return <div>{components}</div>
}

export default DynamicComponents