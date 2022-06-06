import { configureStore } from '@reduxjs/toolkit'

import user from './user';
import operater from './operater';
import stack from './stack';
import post from './post';
import pagecover from './pagecover';


export const store = configureStore({
  reducer: {
    user , operater , stack , post , pagecover
  },
});