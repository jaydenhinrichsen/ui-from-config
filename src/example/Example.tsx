import React from 'react';
import DynamicComponents from './DynamicComponents';
import { ConfigComponent } from './types';

// Mock config that would be received from a config service
const config: ConfigComponent[] = [
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
                props: {name: 'Great Grandchild', age: 15, template: 'person-template-2'},
              }
            ],
          }
        ],
      }
    ],
  },
];

// Mock config request
const fakeConfigRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config);
    }, 1500)
  })
}


// This is a really simple example to explore rendering components based soley
// on configuration provided. 
// The components in 'config' are imported and lazy loaded dynamically 
export const Example = () => {
  // Really simple example of getting config asychronously
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
    <div style={{ width: '100%', display: 'flex', backgroundColor: '#f7f7f7' }}>
      {/* Wait for config */}
      {loaded && (
        <React.Fragment>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '20px' }}>
            <DynamicComponents config={configData} />
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: '20px' }}>
            <pre>{JSON.stringify(configData, undefined, 2)}</pre>
          </div>
        </React.Fragment>
      )}
      {!loaded && (
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <h4>Loading config...</h4>
        </div>
      )}
    </div>
  );
}
