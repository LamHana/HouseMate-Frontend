import styled from 'styled-components';
import { theme } from '@/themes';

export const ConfirmSection = styled.section`
    margin: 72px 0 134px;
`;

export const ConfirmInner = styled.div`
    padding: 30px 19px 14px;
    background-color: ${theme.colors.white};
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    box-shadow: 0px 24px 55px 0px ${theme.colors.shadowPurchasedHover};
`;

export const ConfirmSuccessMsg = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;

    & h2.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 3rem;
        font-weight: 500;
        line-height: 1.33333;
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;

        & span:first-child {
            color: ${theme.colors.primary};
        }

        & span:last-child {
            color: ${theme.colors.secondary};
        }

        & a {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            column-gap: 4px;
            margin: 0 4px;

            &::after {
                height: 1px;
            }
        }
    }
`;

export const ConfirmTransaction = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const ConfirmPaymentMethod = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & figure {
        width: 84px;
        height: 46px;
    }

    & img {
        width: 100%;
        aspect-ratio: 16/9;
    }
`;
