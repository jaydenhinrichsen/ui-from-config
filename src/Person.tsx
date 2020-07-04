import * as React from 'react';

interface IWithTemplate {
  template: string;
}

interface IPersonProps{
  name: string;
  age: number;
}

const PersonTemplate1: React.FC<IPersonProps> = (props) => {
  return (
    <div>
      <h1>{props.name} | {props.age} years old</h1>
      <div style={{ marginLeft: 20}}>
        {props.children}
      </div>
    </div>
  );
}

const PersonTemplate2: React.FC<IPersonProps> = (props) => {
  return (
    <div>
      <h1 style={{ color: '#c1c1c1'}}>{props.name} | {props.age} years old</h1>
      <div style={{ marginLeft: 20}}>
        {props.children}
      </div>
    </div>
  );
}

type IPersonTemplateProps = IPersonProps & IWithTemplate;

const Person: React.FC<IPersonTemplateProps> = (props) => {
  const { template, ...rest } = props;
  switch (template) {
    case 'person-template-2':
      return <PersonTemplate2 {...rest} />
    case 'person-template-1':
      return <PersonTemplate1 {...rest} />
    default:
      return <PersonTemplate1 {...rest} />
  }
};

export default Person;