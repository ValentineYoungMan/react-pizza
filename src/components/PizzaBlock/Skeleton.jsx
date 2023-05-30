import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={260}
    height={400}
    viewBox="0 0 210 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="145" y="13" rx="0" ry="0" width="2" height="7" />
    <circle cx="100" cy="100" r="100" />
    <rect x="0" y="215" rx="10" ry="10" width="200" height="25" />
    <rect x="3" y="255" rx="6" ry="6" width="197" height="50" />
    <rect x="4" y="322" rx="7" ry="7" width="92" height="35" />
    <rect x="109" y="323" rx="7" ry="7" width="81" height="36" />
  </ContentLoader>
);

export default Skeleton;
