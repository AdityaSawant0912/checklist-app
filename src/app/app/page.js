'use client';
import React, { useState, useEffect, useContext } from 'react';
import { SpaceList } from '@/components/space/SpaceList';
import { SpaceDrawer } from '@/components/CreateNew/SpaceDrawer';
import { SpacesContext } from '@/context/SpaceProvider';

function Spaces() {
  const { spaces, addSpaces } = useContext(SpacesContext);
  useEffect(() => {
    async function fetchSpaces() {
      const { spaces } = await fetch('/api/s').then((res) => res.json());
      if (spaces) {
        addSpaces(spaces)
      }
    }
    fetchSpaces();
    return () => {};
  }, []);

  return (
    <section className="m-2">
      <SpaceList spaces={spaces} />
      <SpaceDrawer />
    </section>
  );
}

export default Spaces;
