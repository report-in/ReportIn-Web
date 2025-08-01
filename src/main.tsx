import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NetworkProvider } from './contexts/network/network-context.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from './store.ts'
import { NotificationProvider } from './contexts/notification/notification-context.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NetworkProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </NetworkProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
