import * as React from 'react';

interface IWithTemplate {
  template: string;
}

interface IFamilyProps{
  name: string;
}

const FamilyTemplate1: React.FC<IFamilyProps> = (props) => {
  return (
    <div>
      <h1>The {props.name} Family</h1>
      <div style={{ padding: 20, border: 'solid 2px #c1c1c1', borderRadius: 4 }}>
        {props.children}
      </div>
    </div>
  );
}

type IFamilyTemplateProps = IFamilyProps & IWithTemplate;

const Family: React.FC<IFamilyTemplateProps> = (props) => {
  const { template, ...rest } = props;
  switch (template) {
    default:
      return <FamilyTemplate1 {...rest} />
  }
};

export default Family;
