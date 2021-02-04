import { Component, ElementRef, Inject, NgZone, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import * as RecordRTC from 'recordrtc';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { sl } from "./double_data";
import { Browser } from "@syncfusion/ej2-base";

import {
  ChartTheme,
  ChartAnnotation,
  ILoadedEventArgs,
  ChartAnnotationSettingsModel,
  getSeriesColor,
  IRangeLoadedEventArgs,
  DateTime,
  StepLineSeries,
  Chart,
  IChangedEventArgs,
  IRangeTooltipRenderEventArgs,
  RangeTooltip,
  IAxisLabelRenderEventArgs
} from "@syncfusion/ej2-charts";

// ej2-chart
/**
 * Sample for range navigator with numeric axis
 */

let selectedTheme: string = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme: ChartTheme = <ChartTheme>(
  (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
    /-dark/i,
    "Dark"
  )
);
let chartAnnotation: ChartAnnotationSettingsModel[] = [];
chartAnnotation.push({
  content: '<div id="exchangeRate"></div>',
  coordinateUnits: "Pixel",
  region: "Chart",
  x: "85%",
  y: "15%"
});
let backgroundColor: string = "white";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voice-recorder';

  streamData;
  drawVisual;
  audioCtx;
  analyser;
  source;

  distortion;
  gainNode;
  biquadFilter;
  convolver;

  audioBufferData = [];
  audioBufferArray = [];

  recordRTC;

  url;
  au;
  li;
  link;
  wavesurfer;

  // @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('myCanvas') canvas: ElementRef<HTMLCanvasElement>;
  canvasCtx: CanvasRenderingContext2D;
  displayLineGraph = false;

  pitch = 0;

  bufferlength = 2048;
  buffer = new Float32Array(this.bufferlength);

  chart = [
    {
      name: 'Saw Bean',
      series: []
    }
  ];

  public lineChartData = [
    { data: [], label: 'Pitch' },
  ];

  private amChart: am4charts.XYChart;
  categoryAxis;
  series;
  valueAxis;
  scrollbarX;

  hideZeroes = false;
  pitchShowHideText = 'Hide zeroes';
  pitchDataPoints = [];
  recordCompleted = false;

  constructor(
    private elementRef: ElementRef,
    private _renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId, private zone: NgZone
  ) {
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  startRecording() {
    this.recordCompleted = false;

    if (this.au && this.li && this.link) {
      this.url = null;
      this._renderer.removeChild(this.elementRef.nativeElement, this.au);
      this._renderer.removeChild(this.elementRef.nativeElement, this.li);
      this._renderer.removeChild(this.elementRef.nativeElement, this.link);
    }

    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
    this.audioCtx = new AudioContext();

    this.analyser = this.audioCtx.createAnalyser();
    this.distortion = this.audioCtx.createWaveShaper();
    this.gainNode = this.audioCtx.createGain();
    this.biquadFilter = this.audioCtx.createBiquadFilter();
    this.convolver = this.audioCtx.createConvolver();

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(
        (stream) => {
          this.streamData = stream;
          this.source = this.audioCtx.createMediaStreamSource(stream);
          this.source.connect(this.distortion);
          this.distortion.connect(this.biquadFilter);
          this.biquadFilter.connect(this.gainNode);
          this.convolver.connect(this.gainNode);
          this.gainNode.connect(this.analyser);
          this.analyser.connect(this.audioCtx.destination);

          var options = {
            type: 'audio',
            mimeType: 'audio/wav'
          };

          this.recordRTC = RecordRTC(stream, options);
          this.recordRTC.startRecording();

          //start the recording process 
          console.log("Recording started", this.recordRTC);

          this.visualize();
        }
      )
  }

  stopRecording() {
    this.recordCompleted = true;

    this.streamData.getTracks().forEach(function (track) {
      track.stop();
    });
    this.pitchDataPoints = this.lineChartData[0]['data'];
    this.generateChartData();
    this.getAnnotaiton(this.lineChartData[0]['data'], getSeriesColor(theme)[1]);
    this.displayLineGraph = true;
    this.audioCtx.close();
    cancelAnimationFrame(this.drawVisual);
    this.recordRTC.stopRecording(() => {
      let blob = this.recordRTC.getBlob();
      console.log('Blob: ', blob);
      this.createDownloadLink(blob);
    });

    console.log('1: ', this.audioBufferArray);
    console.log('2: ', new Uint8Array(this.audioBufferArray));
    console.log('Record RTC: ', this.recordRTC);
    // this.createDownloadLink(new Uint8Array(this.audioBufferArray));
  }

  createDownloadLink(audioBufferArray) {

    // var blob = new Blob(audioBufferArray, { type: 'audio/wav' });
    var blob = this.recordRTC.getBlob();

    console.log('Blob: ', blob);

    this.url = URL.createObjectURL(blob);
    this.au = document.createElement('audio');
    this.li = document.createElement('li');
    this.link = document.createElement('a');

    this._renderer.appendChild(this.elementRef.nativeElement, this.au);
    this._renderer.appendChild(this.elementRef.nativeElement, this.li);
    this._renderer.appendChild(this.elementRef.nativeElement, this.link);

    var filename = new Date().toISOString();
    console.log('File name: ', filename);

    const audioFile = new File([blob], `${filename}.wav`, {
      type: 'audio/wav',
      lastModified: Date.now()
    });
    console.log('Audio file: ', audioFile);

    this.au.controls = true;
    this.au.src = this.url;

    //link the a element to the blob 
    this.link.href = this.url;
    this.link.download = new Date().toISOString() + '.wav';

    console.log('Audio: ', this.au);
    this.au.play();

    this.wavesurfer = WaveSurfer.create({
      container: document.querySelector('#waveform'),
      barWidth: 2,
      barHeight: 1, // the height of the wave
      barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
      waveColor: 'violet',
      progressColor: 'purple'
    });
    console.log('Wave surfer: ', this.wavesurfer);
    this.wavesurfer.loadBlob(blob);
    this.wavesurfer.on('ready', function () {
      this.wavesurfer.play();
    });
  }

  visualize() {

    let WIDTH = this.canvas.nativeElement.width;
    let HEIGHT = this.canvas.nativeElement.height;

    this.analyser.fftSize = 2048;

    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    let freqDomain = new Float32Array(bufferLength);
    this.canvasCtx.clearRect(0, 0, 500, 100);

    var drawAlt = () => {
      console.log("data array: ", dataArray);

      console.log('Analyser: ', this.analyser);

      this.audioBufferData.push(Object.assign({ time: this.audioCtx.currentTime, data: dataArray }));
      // audioBufferArray = audioBufferArray.concat([...dataArray]);
      dataArray.forEach(x => {
        this.audioBufferArray.push(x);
      });

      console.log('Audio Buffer data: ', this.audioBufferData);
      console.log('Audio Buffer array: ', this.audioBufferArray);

      // getByteFrequencyData() -> copies current frequency data into unassigned byte array passed into it
      this.analyser.getByteFrequencyData(dataArray);
      this.analyser.getByteTimeDomainData(dataArray);

      this.drawVisual = requestAnimationFrame(drawAlt);
      this.updatePitch();

      console.log('Draw visual: ', this.drawVisual);

      this.canvasCtx.fillStyle = "rgba(0,0,0,0.2)";
      // draws a filled rectangle whose starting point is at (x, y)
      // draws according to current fillStyle(color, gradient, pattern)
      this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferLength) * 2.5;
      let max_val = -Infinity;
      let max_index = -1;
      var barHeight;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        if (barHeight > max_val) {
          max_val = barHeight;
          max_index = i;
          // console.log('Bar height: ', barHeight);
        }

        this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        this.canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    }
    drawAlt();
  }

  updatePitch() {
    this.analyser.getFloatTimeDomainData(this.buffer);
    var ac = this.autoCorrelate(this.buffer, this.audioCtx.sampleRate);

    if (ac == -1) {
      this.pitch = 0;
    } else {
      this.pitch = ac;
    }

    let time = 0;
    let sec = 1000;
    var interval = setInterval(() => {
      time += sec;
      if (this.audioCtx.state == 'running') {
        this.lineChartData[0]['data'].push(this.pitch.toFixed(2));

        console.log('asdasd: ', this.lineChartData);
      } else {
        clearInterval(interval);
      }
    }, sec);

  }

  autoCorrelate(buf, sampleRate) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length;
    var rms = 0;

    for (var i = 0; i < SIZE; i++) {
      var val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) // not enough signal
      return -1;

    var r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (var i = 0; i < SIZE / 2; i++)
      if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (var i = 1; i < SIZE / 2; i++)
      if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    var c = new Array(SIZE).fill(0);
    for (var i = 0; i < SIZE; i++)
      for (var j = 0; j < SIZE - i; j++)
        c[i] = c[i] + buf[j] * buf[j + i];

    var d = 0; while (c[d] > c[d + 1]) d++;
    var maxval = -1, maxpos = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    var a = (x1 + x3 - 2 * x2) / 2;
    var b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  generateChartData() {
    am4core.useTheme(am4themes_animated);

    this.amChart = am4core.create("chartdiv", am4charts.XYChart);

    this.amChart.paddingRight = 20;

    let data = [];
    if (this.hideZeroes) {
      for (let i = 1; i < this.pitchDataPoints.length; i++) {
        // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        if (this.pitchDataPoints[i] != 0)
          // data.push({ date: new Date(2018, 0, i), name: "name" + i, value: this.pitchDataPoints[i] });
          data.push({ category: i, value: this.pitchDataPoints[i] });
      }
    } else {
      for (let i = 1; i < this.pitchDataPoints.length; i++) {
        // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        // data.push({ date: new Date(2018, 0, i), name: "name" + i, value: this.pitchDataPoints[i] });
        data.push({ category: i, value: this.pitchDataPoints[i] });
      }
    }

    this.amChart.data = data;

    // Create axes
    this.categoryAxis = this.amChart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.dataFields.category = "category";
    this.categoryAxis.renderer.grid.template.location = 0;

    this.valueAxis = this.amChart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    this.series = this.amChart.series.push(new am4charts.LineSeries());
    this.series.dataFields.valueY = "value";
    this.series.dataFields.categoryX = "category";
    this.series.tooltipText = "{valueY}";
    this.series.strokeWidth = 3;
    this.series.xAxis = this.categoryAxis;
    this.series.tensionX = 0.77;
    this.series.bullets.push(new am4charts.CircleBullet());

    this.amChart.cursor = new am4charts.XYCursor();

    this.scrollbarX = new am4charts.XYChartScrollbar();
    this.scrollbarX.series.push(this.series);
    this.amChart.scrollbarX = this.scrollbarX;

    console.log('Scroll bar: ', this.scrollbarX);
    console.log('Series: ', this.series);

    this.amChart = this.amChart;
  }

  togglePitchDisplay() {
    this.hideZeroes = !this.hideZeroes;
    if (this.hideZeroes) {
      this.pitchShowHideText = 'Show zeroes';
      this.lineChartData[0]['data'] = this.lineChartData[0]['data'].filter(x => x != 0);

    } else {
      this.pitchShowHideText = 'Hide zeroes';
      this.lineChartData[0]['data'] = this.pitchDataPoints;
    }
    this.generateChartData();
    this.getAnnotaiton(this.lineChartData[0]['data'], getSeriesColor(theme)[1]);
  }

  toggleScroll() {
    console.log('Toggle scrolled:');
  }

  // ej2-chart
  @ViewChild("chartDouble")
  public Chart: Chart;

  public primaryXAxis: Object = {
    title: "Index",
    edgeLabelPlacement: "Shift",
    majorGridLines: { width: 0 },
    labelFormat: "n1"
  };

  public dataSource1: Object[];

  public chartArea: Object = { border: { width: 0 } };

  public primaryYAxis: Object = {
    title: "Pitch",
    minimum: 0,
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 }
  };

  public chartTooltip: Object = { enable: true, shared: true };

  public chartHeight: string = "350";

  public animation: Object = { enable: false };

  public width: string = Browser.isDevice ? "100%" : "80%";

  public theme: ChartTheme = <ChartTheme>(
    (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
      /-dark/i,
      "Dark"
    )
  );

  public rangeValue: Object = [31, 46];

  public annotations: Object = chartAnnotation;

  public tooltip: Object = { enable: true };

  // public legendSettings: Object = { visible: false };

  public getAnnotaiton(args, color: string): void {
    console.log('Args: ', args);
    args = args.map((data, i) => {
      return {
        x: i + 1,
        y: parseFloat(data)
      }
    });
    console.log('args:ASDasd', args)
    for (let i: number = 0; i < args.length; i++) {
      /* tslint:disable:no-string-literal */
      // if (args[i]["isWicket"]) {
      chartAnnotation.push({
        // content:
        //   '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
        //   "background: " +
        //   backgroundColor +
        //   "; border: 2px solid " +
        //   color +
        //   "; color:" +
        //   color +
        //   '">W</div>',
        /* tslint:disable:no-string-literal */
        x: args[i]["x"],
        /* tslint:disable:no-string-literal */
        y: args[i]["y"],
        coordinateUnits: "Point"
      });
      // }
    }
    this.rangeValue = [args[0]['x'], args[args.length - 1]['x']];
    this.dataSource1 = args;
    console.log('Range value: ', this.rangeValue);
    console.log('data source: ', this.dataSource1);
  }

  public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
    if (args.axis.orientation === "Horizontal") {
      let value: number = Math.abs(Number(args.text));
      args.text = String(value);
    }
  }

  public loaded(args: ILoadedEventArgs): void {
    // let series1: string = args.chart.visibleSeries[0].interior;
    // let series2: string = args.chart.visibleSeries[1].interior;
    // // let html: string = "<table></table>";
    // // html +=
    // //   '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' +
    // //   series1 +
    // //   "; background: " +
    // //   series1 +
    // //   ';"></div></td><td style="padding-left:10px;">' +
    // //   " Australia" +
    // //   "</td>";
    // // html +=
    // //   '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' +
    // //   series2 +
    // //   "; background: " +
    // //   series2 +
    // //   ';"></div></td><td style="padding-left:10px;">' +
    // //   " Sri Lanka" +
    // //   "</td>";
    // // html += "</table>";
    // this.Chart.setAnnotationValue(
    //   0,
    //   '<div id="exchangeRate" style="line-height: 18px;' +
    //   "font-size: 13px;background: #fff; opacity:0.9; color: #464e56; " +
    //   " box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;" +
    //   'border-radius: 3px">' +
    //   "</div>"
    // );
  }

  public tooltipRender(args: IRangeTooltipRenderEventArgs): void {
    args.text[0] = Math.round(parseInt(args.text[0], 10)).toString();
  }

  public load(args: IRangeLoadedEventArgs) {
    args.rangeNavigator.rangeTooltipModule = new RangeTooltip(
      args.rangeNavigator
    );
  }

  public changed(args: IChangedEventArgs): void {
    console.log("Changed: ", args);
    this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
    this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
    this.Chart.dataBind();
  }

}
