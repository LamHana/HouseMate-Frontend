import Cart from '@/pages/Customer/Cart';
import HomeLayout from '@/layouts/MainLayout';
import Profile from '@/pages/Customer/Profile';
import Purchased from '@/pages/Customer/Purchased';
import PurchasedDetail from '@/pages/Customer/PurchasedDetail';
import config from '@/config';

// import { useAuth } from '@/hooks';
// import { Role } from '@/utils/enums';
// import { Navigate } from 'react-router-dom';

// Authorization
const CustomerRouter = () => {
    // * Uncomment these 2 lines, if you need to authorize role
    // const { role } = useAuth();
    // return role === Role.CUSTOMER ? <HomeLayout /> : <Navigate to="/" />;

    return <HomeLayout />;
};

// Define routes for customer
const CustomerRoutes = {
    element: <CustomerRouter />,
    children: [
        { path: config.routes.customer.purchasedDetail, element: <PurchasedDetail /> },
        { path: config.routes.customer.purchased, element: <Purchased /> },
        { path: config.routes.customer.purchasedDetail, element: <PurchasedDetail /> },
        { path: config.routes.customer.cart, element: <Cart /> },
        { path: config.routes.customer.profile, element: <Profile /> },
    ],
};

export default CustomerRoutes;
