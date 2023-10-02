'use client';
import React from 'react';
import { TodoContextWrapper } from './context';
import Home from './components/Home';

export default function Main() {
  return (
    <TodoContextWrapper>
      <Home />
    </TodoContextWrapper>
  );
}
