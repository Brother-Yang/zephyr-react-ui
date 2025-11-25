import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigProvider';

export default function useConfig() {
  return useContext(ConfigContext);
}

