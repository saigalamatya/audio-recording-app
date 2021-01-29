import { Component, ElementRef, Inject, NgZone, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import WaveformData from 'waveform-data';
import * as RecordRTC from 'recordrtc';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from '@angular/common';
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
  public lineChartLabels = [];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public chartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false
  };

  private amChart: am4charts.XYChart;

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
    this.streamData.getTracks().forEach(function (track) {
      track.stop();
    });
    this.lineChartLabels = this.lineChartData[0]['data'].map((x, index) => {
      return index.toString();
    });
    this.generateChartData();
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

    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');

    this._renderer.appendChild(this.elementRef.nativeElement, au);
    this._renderer.appendChild(this.elementRef.nativeElement, li);
    this._renderer.appendChild(this.elementRef.nativeElement, link);

    var filename = new Date().toISOString();
    console.log('File name: ', filename);

    const audioFile = new File([blob], `${filename}.wav`, {
      type: 'audio/wav',
      lastModified: Date.now()
    });
    console.log('Audio file: ', audioFile);

    au.controls = true;
    au.src = url;

    //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + '.wav';

    console.log('Audio: ', au);
    au.play();

    var wavesurfer = WaveSurfer.create({
      container: document.querySelector('#waveform'),
      barWidth: 2,
      barHeight: 1, // the height of the wave
      barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
      waveColor: 'violet',
      progressColor: 'purple'
    });
    console.log('Wave surfer: ', wavesurfer);
    wavesurfer.loadBlob(blob);
    wavesurfer.on('ready', function () {
      wavesurfer.play();
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

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < this.lineChartData[0]['data'].length; i++) {
      // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: this.lineChartData[0]['data'][i] });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.amChart = chart;

    console.log('Data: ', data, dateAxis, valueAxis);
    console.log(JSON.stringify(data));
  }

}
