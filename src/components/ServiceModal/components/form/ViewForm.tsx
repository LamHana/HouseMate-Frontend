import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

import { FormType } from '@/components/ServiceModal/ServiceModal';
import InputFields from '@/components/ServiceModal/Service.fields';
import InputService, {
    ServiceType,
} from '@/components/ServiceModal/components/data-entry/InputService';
import { ModalEnum, ServiceCategory, Status } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Col, Rate, Row, Space } from 'antd';
import Progress from '../progress/Progress';
import { ScheduleInfoType } from '@/components/Calendar/Calendar.types';
import fallbackImg from '@/assets/images/fallback-img.png';
import { useAppDispatch } from '@/hooks';
import { scheduleSlice } from '../slice';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    scheduleInfo?: ScheduleInfoType;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
    serviceList: ServiceType[];
    handleUpdate: () => boolean;
};

const ViewForm = ({
    form,
    category,
    scheduleInfo,
    setCategory,
    onSubmit,
    onSubmitFailed,
    serviceList,
    handleUpdate,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
        if (scheduleInfo) {
            dispatch(scheduleSlice.actions.setAllSchedule(scheduleInfo));
        }
    }, [scheduleInfo]);
    const dispatch = useAppDispatch();

    const initialValues = {
        service: scheduleInfo?.service.titleName,
        Date: dayjs(scheduleInfo?.scheduleDetail.startDate),
        timeRange: [
            dayjs(scheduleInfo?.scheduleDetail.startDate),
            dayjs(scheduleInfo?.scheduleDetail.endDate),
        ],
        cycle: scheduleInfo?.scheduleDetail.cycle,
        note: scheduleInfo?.scheduleDetail.note,
        dateRange: [
            dayjs(scheduleInfo?.scheduleDetail.startDate),
            dayjs(scheduleInfo?.scheduleDetail.endDate),
        ],
        time: dayjs(scheduleInfo?.scheduleDetail.startDate),
        type: scheduleInfo?.scheduleDetail.serviceTypeId,
        usage: `Lượng còn lại: ${scheduleInfo?.scheduleDetail.usage?.remaining}/${
            scheduleInfo?.scheduleDetail.usage?.total
        } ${scheduleInfo?.scheduleDetail.usage?.service.titleName} (
                        ${dayjs(scheduleInfo?.scheduleDetail?.usage?.startDate).format(
                            'DD/MM/YYYY',
                        )} -
                        ${dayjs(scheduleInfo?.scheduleDetail.usage?.endDate).format(
                            'DD/MM/YYYY',
                        )})`,
        quantity: scheduleInfo?.scheduleDetail.quantityRetrieve,
        receivedTime: dayjs(scheduleInfo?.scheduleDetail.endDate),
    };
    return (
        <>
            <Styled.ServiceForm
                form={form}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
                initialValues={initialValues}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                disabled={handleUpdate()}
                style={{ maxWidth: 800 }}
            >
                <Row>
                    <Col span={6} style={{ marginBottom: '18px' }}>
                        Tình trạng:
                    </Col>
                    <Col span={8}>
                        <Styled.StatusTag
                            $status={(scheduleInfo?.scheduleDetail.status as Status) || ''}
                        >
                            {scheduleInfo?.scheduleDetail.status}
                        </Styled.StatusTag>
                    </Col>
                </Row>

                <InputService
                    setCategory={setCategory}
                    serviceList={serviceList}
                    variant={ModalEnum.VIEW}
                />

                <InputFields
                    category={scheduleInfo?.service.groupType || category}
                    variant={ModalEnum.VIEW}
                />
            </Styled.ServiceForm>
            <Styled.FormTitle>Thông tin nhân viên</Styled.FormTitle>
            <Row justify={'space-between'} style={{ marginBottom: '30px' }}>
                <Col>
                    <Styled.FormParagraph>
                        Tên: {scheduleInfo?.staff?.staffInfo.fullName}
                    </Styled.FormParagraph>
                    <Styled.FormParagraph>
                        SĐT: {scheduleInfo?.staff?.staffInfo.phoneNumber}
                    </Styled.FormParagraph>

                    <Space size={16} align="center" style={{ marginBottom: '0.5em' }}>
                        <Styled.FormText>Đánh giá:</Styled.FormText>
                        <Rate
                            defaultValue={scheduleInfo ? scheduleInfo.staff?.avgRating : 0}
                            allowHalf
                            disabled
                        />
                        <Styled.FormText>
                            {scheduleInfo?.staff?.avgRating.toFixed(1)}
                        </Styled.FormText>
                    </Space>
                    <Styled.FormParagraph>
                        Điểm tin cậy: {scheduleInfo?.staff?.profiencyScore}
                    </Styled.FormParagraph>
                </Col>
                <Col>
                    <Styled.Avatar
                        width={150}
                        height={120}
                        src={scheduleInfo?.staff?.staffInfo.avatar || fallbackImg}
                        fallback={fallbackImg}
                    />
                </Col>
            </Row>
            <Progress
                report={scheduleInfo?.taskReportList}
                feedback={scheduleInfo?.feedback}
                serviceId={scheduleInfo?.scheduleDetail.serviceId}
            />
        </>
    );
};

export default ViewForm;
