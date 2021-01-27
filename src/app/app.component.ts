import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as WaveSurfer from 'wavesurfer.js';
import WaveformData from 'waveform-data';
import * as RecordRTC from 'recordrtc';
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

  multi: any[] = [];
  view: any[] = [700, 300];

  // options
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel: boolean = false;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private elementRef: ElementRef,
    private _renderer: Renderer2
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

    this.multi.push({ "name": "Test", series: [] });

    this.multi = this.multi.map(x => {
      this.audioBufferArray.forEach((y, i) => {
        x.series.push({ name: `Test${i}`, value: y });
      })
      return x;
    })
    console.log('multi', this.multi)

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

}
