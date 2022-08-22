import React from 'react';

const CustomImage = props => (
  <Image
    resizeMode="contain"
    style={{height: 24, width: 24}}
    source={props.imgName}
  />
);

export default CustomImage;
