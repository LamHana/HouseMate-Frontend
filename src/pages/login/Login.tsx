import { useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';

import config from '@/config';
import Container from '@/components/Container';
import Link from '@/components/Link';
import * as Styled from './Login.styled';
import images, { fallbackImg } from './Login.images';
import socials from './Login.socials';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    email?: string;
    password?: string;
};

const Login = () => {
    useEffect(() => {
        document.title = 'Login | House Mate';
    }, []);

    return (
        <>
            <Container>
                <Row
                    align="middle"
                    style={{
                        height: '100vh',
                    }}
                >
                    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Styled.FormWrapper>
                            <Styled.FormTitle level={1}>Welcome back!</Styled.FormTitle>

                            <Styled.LoginDesc>
                                Home Services Simplified with
                                <Link to={config.routes.home}>HouseMate</Link>
                                by Your Side. Get started for free.
                            </Styled.LoginDesc>

                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                requiredMark={false}
                                autoComplete="off"
                            >
                                <Styled.FormItem<FieldType>
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Please enter a valid email address.',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Styled.FormItem>

                                <Styled.FormItem<FieldType>
                                    label="Password"
                                    name="password"
                                    validateFirst
                                    rules={[
                                        {
                                            required: true,
                                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                            message:
                                                'Must be at least 8 characters, include a number, an uppercase letter, and a lowercase letter.',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Styled.EyeOutlinedIcon />
                                            ) : (
                                                <Styled.EyeInvisibleOutlinedIcon />
                                            )
                                        }
                                    />
                                </Styled.FormItem>

                                <Styled.FormItem>
                                    <Styled.LoginForgotPassword to={config.routes.forgot}>
                                        Forgot Password?
                                    </Styled.LoginForgotPassword>
                                    <Styled.FormButton block type="primary" htmlType="submit">
                                        Login
                                    </Styled.FormButton>
                                </Styled.FormItem>
                            </Form>

                            <Styled.FormDivider>Or continue with</Styled.FormDivider>

                            <Styled.FormIconWrapper>
                                {socials.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <Link href={social.href} key={social.key}>
                                            <Icon size={social.size} color={social.color} />
                                        </Link>
                                    );
                                })}
                            </Styled.FormIconWrapper>

                            <Styled.LoginNotMember>
                                Not a member?
                                <Link to={config.routes.register} title="Register now">
                                    Register now
                                </Link>
                            </Styled.LoginNotMember>
                        </Styled.FormWrapper>
                    </Col>

                    <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                        <Styled.FormCarousel autoplay>
                            {images.map((image) => (
                                <Styled.FormImageWrapper key={image.id}>
                                    <Styled.FormImageOverlay />
                                    <Styled.FormImage
                                        width="100%"
                                        height={640}
                                        src={image.src}
                                        alt="Form Carousel"
                                        preview={false}
                                        fallback={fallbackImg}
                                    />
                                </Styled.FormImageWrapper>
                            ))}
                        </Styled.FormCarousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
