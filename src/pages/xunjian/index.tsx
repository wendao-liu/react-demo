import react, { useEffect, useState } from "react"
import { Input, Row, Col, Button } from 'antd';

const { TextArea } = Input;

// $$compare_from_date$$
// $$from_date$$
// $$to_date$$
// $$compare_to_date$$
const prefix = 'https://da.800jit.com:8107/segmentation/?project=production&product=sbp_family#q=';
// 船公司
let shippingCompany = '{"measures":[{"event_name":"CRM_COSCO_BOOKING_DETAIL_SEARCH","aggregator":"general","name":"COSCO合约详情查询","editName":"COSCO合约详情查询","default_measure_name":"CRM-COSCO-运价查询-合约详情的总次数"},{"event_name":"CRM_COSCO_BOOKING_LIST_SEARCH","aggregator":"general","name":"COSCO合约列表查询","editName":"COSCO合约列表查询","default_measure_name":"CRM-COSCO-运价查询-合约列表的总次数"},{"event_name":"CRM_COSCO_FREIGHT_SEARCH","aggregator":"general","name":"COSCO运价列表查询","editName":"COSCO运价列表查询","default_measure_name":"CRM-COSCO-运价查询-运价列表的总次数"},{"event_name":"BASE_TABLE_FETCH_DATA","aggregator":"general","name":"马士基查询","filter":{"conditions":[{"field":"event.$Anything.current_url","function":"contain","params":["/wwl-crm-front/#/maerskFreight/list"],"$$searchValue":"网页","$$render_index":1}]},"editName":"马士基查询","default_measure_name":"基石列表查询的总次数"},{"event_name":"BASE_TABLE_FETCH_DATA","aggregator":"general","name":"OOCL查询","filter":{"conditions":[{"field":"event.$Anything.current_url","function":"contain","params":["/wwl-crm-front/#/ooclFreight/list"],"$$searchValue":"网页","$$render_index":1}]},"editName":"OOCL查询","default_measure_name":"基石列表查询的总次数"},{"event_name":"CRM_GM2OOCL_TEMPLATE_ORDER","aggregator":"general","name":"OOCL下单","editName":"OOCL下单","default_measure_name":"CRM-oocl运价页面  模版下单的总次数"},{"event_name":"CRM_COSCO_INVENTORY_ORDER_SUBMIT","aggregator":"general","name":"COSCO合约下单","editName":"COSCO合约下单","default_measure_name":"COSCO 合约下单提交订单按钮点击量的总次数"},{"event_name":"CRM_COSCO_FREIGHT_ORDER_SUBMIT","aggregator":"general","name":"COSCO运价下单","editName":"COSCO运价下单","default_measure_name":"COSCO 运价下单提交订单按钮点击量的总次数"}],"from_date":"$$from_date$$","to_date":"$$to_date$$","unit":"day","by_fields":[],"detail_and_rollup":true,"enable_detail_follow_rollup_by_values_rank":true,"sub_task_type":"SEGMENTATION","time_zone_mode":"","server_time_zone":"","include_today":true,"chartType":"line","compareKey":"custom","compare_to_date":"$$compare_to_date$$","filter":{"conditions":[{"field":"user.nickName","function":"notEqual","params":["宋雪","刘航宇","周金华","杨壮","金豪","王东军洋","戚渊博"],"$$searchValue":"昵称","$$render_index":1}]},"compare_from_date":"$$compare_from_date$$","bookmarkid":"1386","fromDash":"{\\"id\\":243,\\"type\\":\\"lego\\"}"}';
// 钉钉小程序
let aSmallProgramThatNail = '{"measures":[{"event_name":"CRM_DD_FREIGHT_SEARCH_PARAMS","aggregator":"general","name":"查询运价参数的总次数","editName":"查询运价参数的总次数","default_measure_name":"钉钉小程序-查询运价参数的总次数"},{"event_name":"CRM_DD_FREIGHT_SEARCH_RESULT","aggregator":"general","name":"查询运价结果的总次数","editName":"查询运价结果的总次数","default_measure_name":"钉钉小程序-查询运价结果的总次数"}],"from_date":"$$from_date$$","to_date":"$$to_date$$","unit":"day","by_fields":[],"detail_and_rollup":true,"enable_detail_follow_rollup_by_values_rank":true,"sub_task_type":"SEGMENTATION","time_zone_mode":"","server_time_zone":"","include_today":true,"chartType":"line","compareKey":"custom","compare_to_date":"$$compare_to_date$$","filter":{"conditions":[{"field":"user.nickName","function":"notEqual","params":["宋雪","刘航宇","周金华","杨壮","金豪","王东军洋","戚渊博"],"$$searchValue":"昵称","$$render_index":1}]},"compare_from_date":"$$compare_from_date$$","bookmarkid":"1385","fromDash":"{\\"id\\":243,\\"type\\":\\"lego\\"}"}';
// 撒价
let andPrice = '{"measures":[{"event_name":"GM2_CRM_AGENTLIST_CLICK_PRICE","aggregator":"general","name":"CRM-海外代理列表页  点击“价格预报”按钮的总次数","default_measure_name":"CRM-海外代理列表页  点击“价格预报”按钮的总次数"},{"event_name":"GM2_AGENT_PREQUOTE_TEMPLATE_NEXT","aggregator":"general","name":"CRM-海外代理撒价-编辑预报价格 点击“下一步，编辑价格”按钮的总次数","default_measure_name":"CRM-海外代理撒价-编辑预报价格 点击“下一步，编辑价格”按钮的总次数"},{"event_name":"GM2_AGENT_PREQUOTE_EDITPRICE_FROMYJT","aggregator":"general","name":"CRM-海外代理撒价-编辑预报价格 点击“从运价通选择”按钮的总次数","default_measure_name":"CRM-海外代理撒价-编辑预报价格 点击“从运价通选择”按钮的总次数"},{"event_name":"GM2_AGENT_PREQUOTE_EDITPRICE_PASTE","aggregator":"general","name":"CRM-海外代理撒价-编辑预报价格 直接粘贴运价数据的总次数","default_measure_name":"CRM-海外代理撒价-编辑预报价格 直接粘贴运价数据的总次数"},{"event_name":"GM2_AGENT_PREQUOTE_EDITPRICE_IMPORT","aggregator":"general","name":"CRM-海外代理撒价-编辑预报价格 点击“直接导入”按钮的总次数","default_measure_name":"CRM-海外代理撒价-编辑预报价格 点击“直接导入”按钮的总次数"},{"event_name":"GM2_AGENT_PREQUOTE_EMAILLIST_ADDCC","aggregator":"general","name":"CRM-海外代理撒价-编辑邮件 点击“添加抄送对象”按钮的总次数","default_measure_name":"CRM-海外代理撒价-编辑邮件 点击“添加抄送对象”按钮的总次数"}],"from_date":"$$from_date$$","to_date":"$$to_date$$","unit":"day","by_fields":[],"detail_and_rollup":true,"enable_detail_follow_rollup_by_values_rank":true,"sub_task_type":"SEGMENTATION","time_zone_mode":"","server_time_zone":"","chartType":"column","include_today":true,"compareKey":"custom","compare_to_date":"$$compare_to_date$$","filter":{"conditions":[{"field":"user.nickName","function":"notEqual","params":["宋雪","刘航宇","周金华","杨壮","金豪","王东军洋","戚渊博"],"$$searchValue":"昵称","$$render_index":1}]},"compare_from_date":"$$compare_from_date$$","bookmarkid":"1384","fromDash":"{\\"id\\":243,\\"type\\":\\"lego\\"}"}';
// 积加销售侧
let productSalesSide = '{"measures":[{"event_name":"CRM_DTC_QUIRY_DETAIL_CALL","aggregator":"general","name":"积加FBA客户询价-点击查看/拨打客户电话的总次数","default_measure_name":"积加FBA客户询价-点击查看/拨打客户电话的总次数"},{"event_name":"CRM_DTC_QUIRY_DETAIL_REPLY","aggregator":"general","name":"积加FBA客户询价-点击“回复报价”（发送报价+暂无报价两个按钮，二次确认后）的总次数","default_measure_name":"积加FBA客户询价-点击“回复报价”（发送报价+暂无报价两个按钮，二次确认后）的总次数"}],"from_date":"$$from_date$$","to_date":"$$to_date$$","unit":"day","by_fields":[],"detail_and_rollup":true,"enable_detail_follow_rollup_by_values_rank":true,"sub_task_type":"SEGMENTATION","time_zone_mode":"","server_time_zone":"","compareKey":"custom","include_today":true,"chartType":"line","filter":{"conditions":[{"field":"user.nickName","function":"notEqual","params":["宋雪","刘航宇","周金华","杨壮","金豪","王东军洋","戚渊博"],"$$searchValue":"昵称","$$render_index":1}]},"compare_to_date":"$$compare_to_date$$","compare_from_date":"$$compare_from_date$$","bookmarkid":"1536","fromDash":"{\\"id\\":243,\\"type\\":\\"lego\\"}"}';

enum EventType {
    '船公司',
    '钉钉小程序',
    '撒价',
    '积加销售侧'
}

function index() {
    const [state, setState] = useState<any>([]);

    const [fromDate, setFromDate] = useState<any>('2023-03-01');
    const [toDate, setToDate] = useState<any>('2023-03-08');
    const [compareFromDate, setCompareFromDatee] = useState<any>('2023-02-22');
    const [compareToDate, setCompareToDate] = useState<any>('2023-03-01');


    useEffect(() => {
        init();
    }, [fromDate, toDate, compareFromDate, compareToDate]);

    function convert(from_date, to_date, compare_from_date, compare_to_date) {
        function handleStr(s) {
            s = s.replace("$$from_date$$", from_date);
            s = s.replace("$$to_date$$", to_date);
            s = s.replace("$$compare_from_date$$", compare_from_date);
            s = s.replace("$$compare_to_date$$", compare_to_date);
            s = prefix + s;
            return s;
        }
        const shippingCompanyCopy = handleStr(shippingCompany);
        const aSmallProgramThatNailCopy = handleStr(aSmallProgramThatNail);
        const andPriceCopy = handleStr(andPrice);
        const productSalesSideCopy = handleStr(productSalesSide);

        return [
            shippingCompanyCopy,
            aSmallProgramThatNailCopy,
            andPriceCopy,
            productSalesSideCopy,
        ];
    }
    const init = () => {
        const urls = convert(fromDate, toDate, compareFromDate, compareToDate);
        setState(urls);
    }

    const handleCopy = () => {
        // 创建输入框
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'absolute';
        textarea.style.clip = 'rect(0 0 0 0)';
        // 赋值
        textarea.value = state.reduce((total, current, currentIndex) => {
            return `
                ${total} 
                # ${EventType[currentIndex]}
                ${current}
            `

        }, '');
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
    }
    return (
        <div>
            <Button onClick={handleCopy}>复制</Button>
            <Row>
                <Col span={6}>
                    fromDate<Input value={fromDate} onChange={(e) => { setFromDate(e.target.value) }}></Input>
                </Col>
                <Col span={6}>
                    toDate<Input value={toDate} onChange={(e) => { setToDate(e.target.value) }}></Input>
                </Col>
                <Col span={6}>
                    compareFromDate<Input value={compareFromDate} onChange={(e) => { setCompareFromDatee(e.target.value) }}></Input>
                </Col>
                <Col span={6}>
                    compareToDate <Input value={compareToDate} onChange={(e) => { setCompareToDate(e.target.value) }}></Input>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <a href={state[0]} target="_blank" >船公司</a><TextArea value={state[0]}></TextArea>
                </Col>
                <Col span={6}>
                    <a href={state[1]} target="_blank" >钉钉小程序</a><TextArea value={state[1]}></TextArea>
                </Col>
                <Col span={6}>
                    <a href={state[2]} target="_blank" >撒价</a><TextArea value={state[2]}></TextArea>
                </Col>
                <Col span={6}>
                    <a href={state[3]} target="_blank" >积加销售侧</a><TextArea value={state[3]}></TextArea>
                </Col>
            </Row>
        </div>
    )
}

export default index