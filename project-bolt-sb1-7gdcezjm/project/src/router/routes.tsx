import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/layout';
import {
  HomePage,
  ShopPage,
  ProductDetailPage,
  CartPage,
  TryOnPage,
  AssistantPage,
  AccountPage,
  SearchPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from '@/pages';

/**
 * Central route table. Adding a new page is a one-line change here.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:categorySlug', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'try-on', element: <TryOnPage /> },
      { path: 'assistant', element: <AssistantPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
