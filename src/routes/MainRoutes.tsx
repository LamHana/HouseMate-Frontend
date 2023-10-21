import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Cart from '@/pages/Customer/Cart';
import Checkout from '@/pages/Customer/Checkout';
import Home from '@/pages/Home';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/404';
import OrderSuccess from '@/pages/Customer/OrderSuccess';
import Profile from '@/pages/Customer/Profile';
import Purchased from '@/pages/Customer/Purchased';
import PurchasedDetail from '@/pages/Customer/PurchasedDetail';
import { Role } from '@/utils/enums';
import Schedule from '@/pages/Customer/Schedule';
import ServiceDetail from '@/pages/ServiceDetail';
import Shop from '@/pages/Shop';
import config from '@/config';
import useAuth from '@/hooks/useAuth';

//* ====================  Authorization for PUBLIC and CUSTOMER ==================== */
const MainRouter = () => {
    const { pathname } = useLocation();
    const { role } = useAuth();

    if (role === Role.ADMIN) return <Navigate to={config.routes.admin.dashboard} />;
    if (role === Role.STAFF) return <Navigate to={config.routes.staff.home} />;

    //? Uncomment this line and in CustomerRouter, if you need to authorize CUSTOMER role
    // if (!role && pathname === config.routes.customer.purchased) return <Outlet />;

    if (pathname === config.routes.customer.orderSuccess) {
        const searchParams = new URLSearchParams(location.search);
        const vnpTxnRef = searchParams.get('vnp_TxnRef');
        const vnpPayDate = searchParams.get('vnp_PayDate');

        if (!vnpTxnRef || !vnpPayDate) {
            return <Navigate to={config.routes.public.home} />;
        }
    }

    return <MainLayout />;
};

const CustomerRouter = () => {
    //? Uncomment these 2 lines and in MainRouter, if you need to authorize CUSTOMER role
    // const { role } = useAuth();
    // return role === Role.CUSTOMER ? <Outlet /> : <Navigate to={config.routes.public.login} />;

    return <Outlet />;
};

//* ==================== Define children routes: PUBLIC, CUSTOMER, NOT FOUND ==================== */
const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.public.shop, element: <Shop /> },
        { path: config.routes.public.serviceDetail, element: <ServiceDetail /> },
    ],
};

const customerRoutes = {
    element: <CustomerRouter />,
    children: [
        { path: config.routes.customer.purchased, element: <Purchased /> },
        { path: config.routes.customer.purchasedDetail, element: <PurchasedDetail /> },
        { path: config.routes.customer.profile, element: <Profile /> },
        { path: config.routes.customer.cart, element: <Cart /> },
        { path: config.routes.customer.checkout, element: <Checkout /> },
        { path: config.routes.customer.orderSuccess, element: <OrderSuccess /> },
        { path: config.routes.customer.schedule, element: <Schedule /> },
    ],
};

const notFoundRoutes = { path: '*', element: <NotFound /> };

//* ==================== Define main routes ==================== */
const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes, customerRoutes, notFoundRoutes],
};

export default MainRoutes;
