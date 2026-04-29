import React from 'react';
import { createRoot } from 'react-dom/client';
import { OsmosProvider } from '@rishikeshjoshi-morpheus/ui';
import '@rishikeshjoshi-morpheus/ui/tokens.css';
import ChooserPage from './ChooserPage';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <OsmosProvider defaultColorMode="light">
    <ChooserPage />
  </OsmosProvider>
);
