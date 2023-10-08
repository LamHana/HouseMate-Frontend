import * as Styled from './PurchasedDetail.styled';

import { EVENTS, USAGE } from './PurchasedDetail.dummy';

import BannerBreadcrumb from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import Schedule from './Schedule';
import ServiceInfo from './ServiceInfo';
import breadcrumbBannerImage from '@/assets/images/breadcrumb-banner-img.png';
import config from '@/config';

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: <Link to={config.routes.customer.purchased}>My purchased</Link>,
    },
    {
        title: 'Manage purchased service',
    },
];

const PurchasedDetail = () => {
    return (
        <>
            <BannerBreadcrumb
                title={{
                    firstLine: ' Welcome to my',
                    secondLine: ['purchased', ''],
                    thirdLine: 'service!',
                }}
                breadcrumbItems={breadcrumbItems}
                image={breadcrumbBannerImage}
            />

            <Styled.PurchasedDetailSection>
                <Container>
                    <ServiceInfo usageList={USAGE} />
                    <Schedule events={EVENTS} />
                </Container>
            </Styled.PurchasedDetailSection>
        </>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
