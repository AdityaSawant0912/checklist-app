'use client';
import React, { useState, useEffect, useContext } from 'react';
import { SpaceList } from '@/components/space/SpaceList';
import { SpaceCreateDrawer } from '@/components/space/SpaceCreateDrawer';
import { SpacesContext } from '@/context/SpaceProvider';

function Spaces() {
  const { spaces, addSpaces } = useContext(SpacesContext);
  useEffect(() => {
    async function fetchSpaces() {
      const { spaces: fetchSpaces } = await fetch('/api/s').then((res) =>
        res.json()
      );
      if (
        fetchSpaces &&
        JSON.stringify(fetchSpaces) !== JSON.stringify(spaces)
      ) {
        console.log('Replaced Spaces with fetched');
        addSpaces(fetchSpaces, true);
      }
    }
    fetchSpaces();
    return () => {};
  }, []);

  return (
    <section className="m-2">
      <SpaceList spaces={spaces} />
      <SpaceCreateDrawer />
    </section>
  );
}

export default Spaces;
