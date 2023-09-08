import * as echarts from 'echarts';
import moment from 'moment';

export class Chart {
  init() {
    this.createChart();
  }
  createChart() {
    const myChart = echarts.init(document.getElementById('main'));
    const maxCount = 20;
    const timeSet = [];
    const legendSet = [];
    const currentTime = new Date();
    const basicColor = [
      '#00c5cd',
      '#009bc7',
      '#cacaff',
      '#ffc125',
      '#df6264',
      '#2b99f0',
      '#8ac449',
      '#009697',
      '#959c2c',
      '#004ae7',
      '#01cc00',
      '#15679a',
      '#43bcd7',
      '#e76627',
      '#5C8558',
      '#A8A5A3',
      '#498700',
      '#832C2D',
      '#C98C5A',
      '#3478BE',
      '#BCF061',
      '#B26600',
      '#27358F',
      '#A4534D',
      '#B89630',
      '#A865B4',
      '#254763',
      '#536859',
      '#3ca0ff',
      '#90db3b',
      '#00c4c5',
      '#ffde00',
      '#ff7781',
      '#8470ff',
      '#75cd8e',
      '#48d1cc',
      '#fec64f',
      '#fe984f',
      '#0052ff',
      '#00a48c',
      '#83cfde',
      '#dfe32d',
      '#ff7d40',
      '#99c7ff',
      '#a5fee3',
      '#0379c9',
      '#eef093',
      '#ffa891',
      '#E9F378',
      '#888A79',
      '#D67D4B',
      '#2BEC69',
      '#4A2BEC',
      '#2BBEEC',
      '#DDACDF',
    ];

    for (let ix = 0; ix < maxCount; ix++) {
      timeSet.push(moment(currentTime).add(-ix, 'h').valueOf());
    }

    for (let ix = 0; ix < maxCount; ix++) {
      const dataSet = [];
      for (let ix = 0; ix < maxCount; ix++) {
        dataSet.push(Math.round(Math.random() * 10));
      }

      legendSet.push({
        name: `data${ix}`,
        type: 'line',
        data: dataSet,
        itemStyle: { color: basicColor[ix] },
        lineStyle: { width: 2, color: basicColor[ix] },
        symbol: 'none',
      });
    }
    // specify chart configuration item and data
    const option = {
      title: {
        text: 'ECharts entry example',
      },
      color: ['#3398DB'],
      tooltip: {},
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: 50,
        height: 300,
        right: 0,
        bottom: 20,
        textStyle: {
          fontSize: 11,
        },
        pageTextStyle: {
          fontSize: 12,
          pageIconSize: 12,
        },
        pageIconSize: 12,
      },
      xAxis: {
        data: timeSet.reverse(),
        axisLabel: {
          show: true,
          formatter(v) {
            const date = new Date(+v);
            return moment(date).format('DD HH:mm');
          },
        },
      },
      yAxis: {},
      series: legendSet,
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);

    const button = document.getElementById('btn_download');

    button.addEventListener('click', () => {
      const dom = echarts.getInstanceByDom(document.getElementById('main'));
      const preview = document.getElementById('preview');

      // create image
      const dataURL = dom.getDataURL();
      const image = new Image();

      image.src = dataURL;
      preview.appendChild(image);

      // download
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = dataURL;
      link.target = '_blank';
      link.click();
    });

    const $ = (elQuery) => document.querySelector(elQuery);
    const mergeStyle = (el, style) => Object.assign(el.style, style);

    const $target = $('.window_two');
    const $btn = $('#btn');

    let openStatus = true;
    const originWidth = $target.clientWidth;

    $btn.onclick = () => {
      mergeStyle($target, { width: openStatus ? 0 : `${originWidth}px` });
      openStatus = !openStatus;
    };

    // $('#summernote').summernote();

    const dom = document.createElement('div');

    dom.setAttribute('width', '200px');
    dom.setAttribute('height', '200px');
    dom.setAttribute('background', 'red');

    document.body.appendChild(dom);
  }
}
