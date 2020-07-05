export interface ConfigComponent {
  id: string;
  component: string;
  props: {
    template: string;
    [x: string]: unknown;
  },
  children?: ConfigComponent[]
}

export interface DynamicComponentProps {
  config: ConfigComponent[];
}

export interface ImportedComponents {
  [x: string]: React.LazyExoticComponent<React.ComponentType<any>>;
}
