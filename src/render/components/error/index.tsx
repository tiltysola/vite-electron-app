import { ReactChild } from 'react';

import './style.less';

interface ErrorDataProp {
  data: {
    title: string;
    desc: Array<{
      text: string | ReactChild;
      type?: 'normal' | 'primary';
    }>;
    footer?: string;
  };
}

const Index = ({ data }: ErrorDataProp) => {
  return (
    <div className="error">
      <div className="e-header">
        <img className="e-logo" src="logo.png" />
        <span className="e-info">{data.title}</span>
      </div>
      <div className="e-main">
        {data.desc.map((v, i) => (
          <p className={`e-text-${v.type || 'normal'}`} key={i}>{v.text}</p>
        ))}
      </div>
      {data.footer && (
        <div className="e-footer">
          <p className="e-text">{data.footer}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
