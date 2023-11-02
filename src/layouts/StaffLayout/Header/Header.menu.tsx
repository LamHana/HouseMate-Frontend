import { MenuProps } from 'antd';
import { AiOutlineLogout, AiOutlineNotification, AiOutlineUser } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';
import cookieUtils from '@/utils/cookieUtils';

type MenuItem = Required<MenuProps>['items'][number];

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon?: JSX.Element,
    title?: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    children?: MenuItem[],
    type?: 'group',
): MenuItem =>
    ({
        key: key,
        label: (
            <Link to={key} onClick={onClick}>
                {icon}
                {title}
            </Link>
        ),
        children,
        type,
    } as MenuItem);

const handleLogout = () => cookieUtils.removeItem(config.cookies.token);

const menu = [
    createMenuItem(
        config.routes.staff.profile,
        <AiOutlineUser size={20} color={theme.colors.textPrimary} />,
        'Hồ sơ',
    ),
    createMenuItem(
        config.routes.staff.newJob,
        <AiOutlineNotification size={20} color={theme.colors.textPrimary} />,
        'Công việc',
    ),
    createMenuItem(
        'Task',
        <BiTask size={20} color={theme.colors.textPrimary} />,
        'Nhiệm vụ',
        (e) => e.preventDefault(),
        [
            createMenuItem('1', <></>, 'Lịch trình làm việc'),
            createMenuItem(config.routes.staff.task, <></>, 'Danh sách công việc'),
        ],
    ),
    createMenuItem(
        config.routes.public.login,
        <AiOutlineLogout size={20} color={theme.colors.textPrimary} />,
        'Đăng xuất',
        handleLogout,
    ),
];

export default menu;
