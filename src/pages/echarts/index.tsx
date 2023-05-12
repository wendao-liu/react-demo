import React, { useEffect, useRef, useState } from 'react';
import { Button, Space } from 'antd';
import * as echarts from 'echarts';
import world from './world.json';
import { debounce } from 'lodash';

const beijingPoint = {
  name: 'Beijing',
  value: '123',
  // 经纬度
  coord: [116.46, 39.92],
  symbol:
    'image://https://qa600jit-public.oss-cn-hangzhou.aliyuncs.com/upload_public/sites/3/orgs/1000000033/20230427095823/c5b30f48-3b95-467a-a44a-36b269ff15da/%E7%8E%AF%E4%B8%96%E5%85%AC%E5%8F%B8%E6%A0%87%E7%AD%BE.png',
  symbolSize: [128, 42],
  itemStyle: {
    color: 'blue',
  },
  test: 'beijingPoint',
};

const japanPoint = {
  name: '日本',
  value: '444',
  // 经纬度
  coord: [138, 35],
  symbol:
    'image://https://qa600jit-public.oss-cn-hangzhou.aliyuncs.com/upload_public/sites/3/orgs/1000000033/20230427095823/c5b30f48-3b95-467a-a44a-36b269ff15da/%E7%8E%AF%E4%B8%96%E5%85%AC%E5%8F%B8%E6%A0%87%E7%AD%BE.png',
  symbolSize: [128, 42],
  itemStyle: {
    color: 'blue',
  },
  test: 'japanPoint',
};

const japanPoint1 = {
  name: '日本',
  value: '555',
  // 经纬度
  coord: [139, 35.9],
  symbol:
    'image://https://qa600jit-public.oss-cn-hangzhou.aliyuncs.com/upload_public/sites/3/orgs/1000000033/20230427095823/c5b30f48-3b95-467a-a44a-36b269ff15da/%E7%8E%AF%E4%B8%96%E5%85%AC%E5%8F%B8%E6%A0%87%E7%AD%BE.png',
  symbolSize: [128, 42],
  itemStyle: {
    color: 'blue',
  },
  test: 'japanPoint',
};

const MapChart = () => {
  const { handleZoom, selectDataRange } = useMap();

  return (
    <>
      <div id="main" style={{ width: '100%', height: '100vh' }} />
      <Space style={{ position: 'fixed', right: 10, bottom: 10 }}>
        <Button onClick={() => handleZoom('in')}>放大</Button>
        <Button onClick={() => handleZoom('out')}>缩小</Button>
        <Button onClick={() => selectDataRange()}>选取映射的数值范围</Button>
      </Space>
    </>
  );
};

const useMap = () => {
  const myChart = useRef<any>(null);
  const option = useConfig();

  useEffect(() => {
    // 初始化
    init();
    // 监听地图的缩放和平移事件
    mapMousewheel();
    // 获取zoom,设置markPoint
    getZoom();
  }, []);

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
  }, 1000);

  // 监听地图的缩放和平移事件
  const mapMousewheel = () => {
    // 地理坐标系 geo 的缩放和平移漫游事件。
    myChart.current.on('geoRoam', debounceGetZoom);

    // // 会被echarts的滚动事件阻止掉，监听不到
    // window.addEventListener('wheel', debounce(function (event) {
    //     console.log("监听到滚动事件");
    // }, 500));

    myChart.current.on('click', function (params) {
      console.log({ params });
      const { event } = params;
      const { offsetX, offsetY } = event;

      const coord = myChart.current.convertFromPixel({ seriesIndex: 0 }, [
        offsetX,
        offsetY,
      ]);
      myChart.current.setOption({
        series: [
          {
            markPoint: {
              tooltip: {
                show: false,
              },
              data: [
                {
                  name: 'Beijing',
                  value: '123',
                  // 经纬度
                  coord,
                  symbol:
                    'image://https://qa600jit-public.oss-cn-hangzhou.aliyuncs.com/upload_public/sites/3/orgs/1000000033/20230427095823/c5b30f48-3b95-467a-a44a-36b269ff15da/%E7%8E%AF%E4%B8%96%E5%85%AC%E5%8F%B8%E6%A0%87%E7%AD%BE.png',
                  symbolSize: [128, 42],
                  itemStyle: {
                    color: 'blue',
                  },
                  test: 'beijingPoint',
                },
              ],
              label: {
                position: 'right',
                show: true,
                distance: -90,
                formatter: ({ data }) => {
                  const { test, value } = data || {};
                  return `${value}-${test}`;
                },
              },
            },
          },
        ],
      });

      const { dataIndex, seriesIndex, componentType } = params || {};
      if (componentType === 'markPoint') {
        // 点击markPoint置顶
        var option = myChart.current.getOption();
        var series = option.series[seriesIndex];
        var currentMark = series.markPoint.data.splice(dataIndex, 1);
        series.markPoint.data.push(currentMark[0]);
        console.log(series.markPoint.data, currentMark[0], dataIndex);

        myChart.current.setOption(option);
      }
    });

    // 双击事件
    myChart.current.on('dblclick', (params) => {
      if (params.componentType === 'markPoint') {
        handleDblclickMarkPoint(params.data.coord);
      }
    });
  };

  // 设置markPoint
  const setMarkPoint = (zoom) => {
    let timeout;
    timeout?.clearTimeout?.();
    timeout = setTimeout(() => {
      myChart.current.setOption({
        series: [
          {
            markPoint: {
              tooltip: {
                show: false,
              },
              // // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
              // silent: true,
              data: [japanPoint1, zoom > 5 ? beijingPoint : japanPoint],
              label: {
                position: 'right',
                show: true,
                distance: -90,
                formatter: ({ data }) => {
                  const { test, value } = data || {};
                  return `${value}-${test}`;
                },
              },
              // emphasis: {
              //   // 禁止高亮
              //   disabled: true,
              // },
              // // 是否开启动画
              // animation: false
            },
          },
        ],
      });
    }, 100);
  };

  // 以双击markPoint的位置,居中放大10倍展示
  const handleDblclickMarkPoint = (coord) => {
    const option = myChart.current.getOption();
    if (option?.series?.[0]) {
      option.series[0].zoom = 10;
      option.series[0].center = coord;
      myChart.current.setOption(option);
      getZoom();
    }
  };

  // 获取当前地图的缩放比例
  const getZoom = () => {
    const option = myChart.current.getOption();
    const targetZoom = option?.series?.[0].zoom;
    console.log({ targetZoom });
    // 设置markPoint
    // setMarkPoint(targetZoom);
  };

  // 放大缩小
  const handleZoom = (mode: 'in' | 'out') => {
    const option = myChart.current.getOption();
    if (option?.series?.[0]) {
      let zoom;
      if (mode === 'in') {
        zoom = option.series[0].zoom + 1 > 10 ? 10 : option.series[0].zoom + 1;
      } else if (mode === 'out') {
        zoom = option.series[0].zoom - 1 < 1 ? 1 : option.series[0].zoom - 1;
      }
      option.series[0].zoom = zoom;
      myChart.current.setOption(option);
      getZoom();
    }
  };

  // 选取映射的数值范围
  const selectDataRange = () => {
    myChart.current.dispatchAction({
      type: 'selectDataRange',
      // 选取 20 到 40 的值范围
      selected: [0, 6553255],
    });
  };

  return { handleZoom, selectDataRange };
};

const useConfig = () => {
  const option = {
    backgroundColor: {
      // 参考:https://echarts.apache.org/zh/option.html#color
      image:
        'https://qa600jit-public.oss-cn-hangzhou.aliyuncs.com/upload_public/sites/3/orgs/1000000033/20230427135351/f3cf3462-45af-44a2-9e7a-05686b28fbe8/%E8%83%8C%E6%99%AF.jpg',
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
        layoutSize: '100%',
        name: '世界分布',
        type: 'map',
        // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        roam: true,
        map: 'USA',
        data: [
          { name: 'China', value: 4822023 },
          { name: '中国', value: 731449 },
          { name: 'Russia', value: 6553255 },
          { name: 'Japan', value: 30000000 },
        ],
        nameMap: {
          China: '中国',
        },
        // 以中国为中心
        // center: [105, 35],
        // 缩放比例
        zoom: 1,
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
          max: 89,
        },
        // // 图表标注。
        // markPoint: {
        //   data: [
        //     beijingPoint,
        //     japanPoint
        //   ],
        //   label: {
        //     show: true,
        //     emphasis: {
        //       disabled: true,
        //     },
        //   },
        // },
      },
    ],
  };

  return option;
};

export default MapChart;
