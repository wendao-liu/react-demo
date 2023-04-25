import React, { useEffect, useRef, useState } from 'react';
import { Button, Space } from 'antd';
import * as echarts from 'echarts';
import world from './world.json';
import { debounce } from 'lodash';

const option = {
  backgroundColor: {
    // 参考:https://echarts.apache.org/zh/option.html#color
    image:
      'https://img0.baidu.com/it/u=697903734,1544489081&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    repeat: 'repeat',
  },
  title: {
    text: 'USA Population Estimates (2012)',
    subtext: 'Data from www.census.gov',
    sublink: 'http://www.census.gov/popest/data/datasets.html',
    left: 'right',
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    // transitionDuration: 0.2
  },
  visualMap: {
    left: 'left',
    min: 500000,
    max: 38000000,
    orient: 'horizontal',
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026',
      ],
    },
    text: ['High', 'Low'],
    calculable: true,
    textStyle: {
      color: '#fff',
    },
  },
  // 工具栏关闭
  toolbox: {
    show: false,
    //orient: 'vertical',
    left: 'left',
    top: 'top',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },

  series: [
    {
      name: '世界分布',
      type: 'map',
      roam: true,
      map: 'USA',
      data: [
        { name: 'China', value: 4822023 },
        { name: '中国', value: 731449 },
        { name: 'Russia', value: 6553255 },
        { name: 'Japan', value: 30000000 },
        { name: 'California', value: 38041430 },
        { name: 'Colorado', value: 5187582 },
        { name: 'Connecticut', value: 3590347 },
        { name: 'Delaware', value: 917092 },
        { name: 'District of Columbia', value: 632323 },
        { name: 'Florida', value: 19317568 },
        { name: 'Georgia', value: 9919945 },
        { name: 'Hawaii', value: 1392313 },
        { name: 'Idaho', value: 1595728 },
        { name: 'Illinois', value: 12875255 },
        { name: 'Indiana', value: 6537334 },
        { name: 'Iowa', value: 3074186 },
        { name: 'Kansas', value: 2885905 },
        { name: 'Kentucky', value: 4380415 },
        { name: 'Louisiana', value: 4601893 },
        { name: 'Maine', value: 1329192 },
        { name: 'Maryland', value: 5884563 },
        { name: 'Massachusetts', value: 6646144 },
        { name: 'Michigan', value: 9883360 },
        { name: 'Minnesota', value: 5379139 },
        { name: 'Mississippi', value: 2984926 },
        { name: 'Missouri', value: 6021988 },
        { name: 'Montana', value: 1005141 },
        { name: 'Nebraska', value: 1855525 },
        { name: 'Nevada', value: 2758931 },
        { name: 'New Hampshire', value: 1320718 },
        { name: 'New Jersey', value: 8864590 },
        { name: 'New Mexico', value: 2085538 },
        { name: 'New York', value: 19570261 },
        { name: 'North Carolina', value: 9752073 },
        { name: 'North Dakota', value: 699628 },
        { name: 'Ohio', value: 11544225 },
        { name: 'Oklahoma', value: 3814820 },
        { name: 'Oregon', value: 3899353 },
        { name: 'Pennsylvania', value: 12763536 },
        { name: 'Rhode Island', value: 1050292 },
        { name: 'South Carolina', value: 4723723 },
        { name: 'South Dakota', value: 833354 },
        { name: 'Tennessee', value: 6456243 },
        { name: 'Texas', value: 26059203 },
        { name: 'Utah', value: 2855287 },
        { name: 'Vermont', value: 626011 },
        { name: 'Virginia', value: 8185867 },
        { name: 'Washington', value: 6897012 },
        { name: 'West Virginia', value: 1855413 },
        { name: 'Wisconsin', value: 5726398 },
        { name: 'Wyoming', value: 576412 },
        { name: 'Puerto Rico', value: 3667084 },
      ],
      nameMap: {
        China: '中国',
      },
      // 以中国为中心
      center: [105, 35],
      // 缩放比例
      zoom: 4,
      // 非高亮状态下的多边形和标签样式。
      itemStyle: {
        // 底图色
        areaColor: 'green',
        // 边框颜色
        borderColor: 'yellow',
      },
      // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选
      selectedMode: false,
      // 高亮状态下的多边形和标签样式。
      emphasis: {
        //参考：https://echarts.apache.org/v4/zh/option.html#series-map.emphasis.itemStyle
        label: {
          // position: 'top',
          color: '#fff',
        },
        itemStyle: {
          areaColor: 'red',
        },
        // 是否禁止hover高亮
        disabled: true,
      },
      //选中状态下的多边形和标签样式。
      select: {
        // 参考：https://echarts.apache.org/zh/option.html#series-map.select
        itemStyle: {
          areaColor: 'purple',
        },
      },
      // 非高亮下是否展示label
      label: {
        // show: true,
        // color: '#fff',
      },
      // zoom最大最小值
      scaleLimit: {
        min: 1,
        max: 10,
      },
      // 图表标注。
      markPoint: {
        data: [
          {
            name: 'Beijing',
            value: '123',
            // 经纬度
            coord: [116.46, 39.92],
            symbol:
              'image://https://img0.baidu.com/it/u=697903734,1544489081&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            symbolSize: [20, 10],
            itemStyle: {
              color: 'blue',
            },
          },
        ],
        label: {
          show: false,
        },
      },
    },
  ],
};

const MapChart = () => {
  const myChart = useRef<any>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    init();
    mapMousewheel();
  }, []);

  useEffect(() => {
    setMarkPoint(zoom);
  }, [zoom]);

  const setMarkPoint = (zoom) => {
    myChart.current.setOption({
      series: [
        {
          markPoint: {
            data: [
              {
                name: zoom > 5 ? 'Beijing' : '日本',
                value: zoom > 5 ? '666' : '444',
                // 经纬度
                coord: zoom > 5 ? [116.46, 39.92] : [139.6917, 35.6895],
                symbol:
                  'image://https://img0.baidu.com/it/u=697903734,1544489081&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                symbolSize: [20, 10],
                itemStyle: {
                  color: 'blue',
                },
              },
            ],
            label: {
              show: false,
            },
          },
        },
      ],
    });
  };

  const init = () => {
    var chartDom = document.getElementById('main') as HTMLDivElement;

    myChart.current = echarts.init(chartDom);

    // myChart.current.dispatchAction({
    //     type: 'dataZoom',
    //     startValue: 0,
    //     endValue: 10
    // });
    // myChart.current.on('dataZoom', getZoom);

    myChart.current.hideLoading();
    echarts.registerMap('USA', world as any, {
      Alaska: {
        left: -131,
        top: 25,
        width: 15,
      },
      Hawaii: {
        left: -110,
        top: 28,
        width: 5,
      },
      'Puerto Rico': {
        left: -76,
        top: 26,
        width: 2,
      },
    });

    myChart.current.setOption(option);
  };

  const debounceGetZoom = debounce(() => {
    getZoom();
  }, 500);

  const mapMousewheel = () => {
    // geoRoam监听地图缩放
    myChart.current.on('geoRoam', debounceGetZoom);
    // // 会被echarts的滚动事件阻止掉，监听不到
    // window.addEventListener('wheel', debounce(function (event) {
    //     console.log("监听到滚动事件");
    // }, 500));
    // myChart.current.on('click', debounceGetZoom);

    // 双击事件
    myChart.current.on('dblclick', (params) => {
      if (params.componentType === 'markPoint') {
        handleDblclickMarkPoint(params.data.coord);
      }
    });
  };

  // 以双击markPoint的位置,居中放大10倍展示
  const handleDblclickMarkPoint = (coord) => {
    const option = myChart.current.getOption();
    if (option?.series?.[0]) {
      option.series[0].zoom = 10;
      option.series[0].center = coord;
      myChart.current.setOption(option);
      setZoom(10);
    }
  };

  const getZoom = () => {
    const option = myChart.current.getOption();
    const targetZoom = option?.series?.[0].zoom;
    console.log({ targetZoom });
    setZoom(~~targetZoom);
  };

  const handleZoom = (zoom: 'in' | 'out') => {
    const option = myChart.current.getOption();
    if (option?.series?.[0]) {
      if (zoom === 'in') {
        option.series[0].zoom =
          option.series[0].zoom + 1 > 10 ? 10 : option.series[0].zoom + 1;
      } else if (zoom === 'out') {
        option.series[0].zoom =
          option.series[0].zoom - 1 < 1 ? 1 : option.series[0].zoom - 1;
      }
      myChart.current.setOption(option);
    }
  };

  const selectDataRange = () => {
    myChart.current.dispatchAction({
      type: 'selectDataRange',
      // 选取 20 到 40 的值范围
      selected: [0, 6553255],
    });
  };

  return (
    <>
      <div id="main" style={{ width: '100%', height: '80vh' }} />
      <Space>
        <Button onClick={getZoom}>获取zoom</Button>
        <Button onClick={() => handleZoom('in')}>放大</Button>
        <Button onClick={() => handleZoom('out')}>缩小</Button>
        <Button onClick={() => selectDataRange()}>选取映射的数值范围</Button>
      </Space>
    </>
  );
};

export default MapChart;
