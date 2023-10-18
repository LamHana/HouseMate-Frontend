import styled, { css } from 'styled-components';
import { theme } from '@/themes';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

export const JobDetailSection = styled.section`
    padding: 20px 0 70px;
    background-color: ${theme.colors.white};
`;

export const JobDetailBanner = styled.div`
    position: relative;

    & .ant-image {
        display: block;
    }

    & .ant-image img {
        display: block;
        border-radius: 4px;
        object-fit: cover;
    }

    & figure img {
        position: absolute;
        top: -14px;
        left: 100px;
    }
`;

export const JobDetailHeading = styled.section`
    margin-top: 16px;

    & h1.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
        text-align: center;
    }

    & span.ant-typography {
        display: block;
        color: ${theme.colors.secondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
        text-align: center;
    }
`;

export const JobDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-top: 8px;
`;

export const JobDetailText = css`
    margin-bottom: 0;
    color: ${theme.colors.textPrimary};
    font-size: 1.2rem;
    line-height: 1.83333;
`;

export const JobDetailTextKey = styled(Title)`
    &.ant-typography {
        ${JobDetailText}

        display: inline-block;
        margin-right: 4px;
        font-weight: 500;
    }
`;

export const JobDetailTextValue = styled(Text)`
    &.ant-typography {
        ${JobDetailText}

        font-weight: 400;
    }
`;

export const JobDetailInfo = styled.div`
    & li {
        margin-left: 16px;
        font-size: 1rem;
    }
`;

export const JobDetailButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 16px;
    margin-left: auto;
    padding: 0 16px;
    width: 94px;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    border: 1px solid ${theme.colors.primary};
    background: ${theme.colors.primary};
    box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

    color: ${theme.colors.white};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.57143;
`;
