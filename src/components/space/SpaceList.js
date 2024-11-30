import React from 'react';
import { SpaceItem } from './SpaceItem';
export const SpaceList = ({ spaces }) => {
  return (
    <>
      {spaces.map((space) => {
        return <SpaceItem space={space} key={space._id}/>;
      })}
    </>
  );
};
