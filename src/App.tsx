import React from 'react';
import DynamicComponents from 'DynamicComponents';

// Mock config that would be received from a config service
const config = [
  {
    id: 'family-1-person-1',
    component: 'Person',
    props: {name: 'Parent', age: 98, template: 'person-template-1'},
    children: [
      {
        id: 'family-1-person-2',
        component: 'Person',
        props: {name: 'Child', age: 77, template: 'person-template-1'},
        children: [
          {
            id: 'family-1-person-3',
            component: 'Person',
            props: {name: 'Grandchild', age: 38, template: 'person-template-1'},
            children: [
              {
                id: 'family-1-person-4',
                component: 'Person',
                path: './Person',
                props: {name: 'Great Grandchild', age: 15, template: 'person-template-2'},
              }
            ],
          }
        ],
      }
    ],
  },
];

const fakeConfigRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, 2000)
  })
}


// This is a really simple example to explore rendering components based soley
// on configuration provided. 
// The components in 'config' are imported and lazy loaded dynamically 
const App = () => {
  // Really simple example of get config asychronously
  const [loaded, setLoaded] = React.useState(false);
  const [configData, setConfigData] = React.useState<any>([]);

  // 'fetch' config on app mount
  React.useEffect(() => {
    if (!loaded) {
      fakeConfigRequest().then(result => {
        setConfigData(result)
        setLoaded(true);
      }).catch(err => { })
    }
  });
  return (
    <div style={{ margin: 30}}>
      {/* Wait for config */}
      {loaded && <DynamicComponents config={configData} />}
      {!loaded && <h4>Loading config...</h4>}
    </div>
  );
}

export default App;
