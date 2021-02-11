(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\n  <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n    <strong>Welcome!</strong> For the time being the recording length is set to 10 seconds max.\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n\n  <!-- <div class=\"wrapper\" #wrapper> -->\n  <div class=\"btn-group mt-2 mb-2\">\n    <button *ngIf=\"!isRecording\" type=\"button\" class=\"btn btn-primary\" (click)=\"startRecording()\">Record</button>&nbsp;\n    <button *ngIf=\"isRecording\" type=\"button\" class=\"btn btn-danger\" (click)=\"stopRecording()\">Stop</button>\n  </div>\n  <div class=\"row\">\n    <canvas class=\"visualizer ml-3\" width=\"640\" height=\"100\" #myCanvas></canvas>\n  </div>\n\n  <!-- <div class=\"row\">\n    <div id=\"waveform\"></div>\n\n    <div class=\"waveform-container\">\n      <div class=\"zoom-view-container\"></div>\n      <div class=\"overview-container\"></div>\n    </div>\n  </div> -->\n\n  <div class=\"row\">\n    <label class=\"ml-3\">Pitch: {{pitch.toFixed(2)}}Hz</label>\n    <!-- <div *ngIf=\"recordCompleted\">\n      <div class=\"form-group form-check\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"togglePitchDisplay()\">\n          {{pitchShowHideText}} </button>\n      </div>\n    </div> -->\n  </div>\n  <div class=\"row\">\n    <div class=\"form-check ml-3\" *ngIf=\"recordCompleted\">\n      <input class=\"form-check-input\" type=\"checkbox\" data-toggle=\"toggle\" [checked]=\"hideZeroes\"\n        name=\"showHideCheckBox\" (change)=\"togglePitchDisplay()\">\n      <label class=\"form-check-label\" for=\"showHideCheckBox\">\n        {{pitchShowHideText}}\n      </label>\n    </div>\n  </div>\n  <!-- <div id=\"chartdiv\" style=\"width: 100%; height: 500px\"></div> -->\n\n  <div class=\"control-section\" *ngIf=\"recordCompleted\">\n    <!-- <div class=\"row\">\n      Average pitch of selected range: {{rangeAverage}} Hz\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"addToRollingAverage()\">Add to Rolling Average</button>\n      <input type=\"number\" class=\"form-control col-sm-3\" name=\"rangeSize\" [(ngModel)]=\"rangeSize\"\n        placeholder=\"Enter range size\" (change)=\"changeRangeSize($event)\">\n    </div> -->\n    <form>\n      <div class=\"form-group row\">\n        <label for=\"startingPoint\" class=\"col-sm-2 col-form-label\">Increment size:</label>\n        <div class=\"col-sm-3\">\n          <input type=\"text\" class=\"form-control\" name=\"startingPoint\" [(ngModel)]=\"incrementSize\"\n            (change)=\"changeIncrementSize($event)\" placeholder=\"Enter increment size...\" tabindex=\"1\">\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label for=\"range\" class=\"col-sm-2 col-form-label\">Range: </label>\n        <div class=\"col-sm-3\">\n          <input type=\"text\" class=\"form-control\" name=\"range\" [(ngModel)]=\"rangeSize\"\n            (change)=\"changeRangeSize($event)\" placeholder=\"Enter range...\" [readonly]=\"!incrementSizeEntered\"\n            [title]=\"!incrementSizeEntered ? 'Please enter starting point before entering range.': ''\" tabindex=\"2\">\n        </div>\n      </div>\n\n      <div class=\"form-group row\">\n        <label for=\"range\" class=\"col-sm-2 col-form-label\"> </label>\n        <button *ngIf=\"rangeSize\" type=\"button\" class=\"btn btn-primary ml-3\"\n          (click)=\"calculateRollingAverage()\">Generate\n          Rolling\n          Average</button>\n      </div>\n\n    </form>\n    <label>Amplitude Chart</label>\n    <br />\n    <div class=\"row\">\n      <div align=\"center\">\n        <ejs-chart #amplitudeChart style='display:block;' id='amplitudeChart' align='center' [chartArea]='chartArea'\n          [width]='width' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxisForAmplitude' height='300'\n          [theme]='theme' [tooltip]='tooltip' [annotations]='annotations' (axisLabelRender)='axisLabelRender($event)'>\n          <e-series-collection>\n            <e-series [dataSource]='amplitudeDataSource' name='Amplitude' type='Spline' xName='x' yName='y' width='2'\n              [marker]=\"marker\" [animation]='animation' [fill]=\"'#e74c3d'\">\n            </e-series>\n          </e-series-collection>\n        </ejs-chart>\n      </div>\n    </div>\n    <label>Pitch Chart</label>\n    <br />\n    <div class=\"row\" align=\"center\">\n      <!-- <div align=\"center\">\n        <ejs-rangenavigator style='display:block' align='center' id='containerDouble' [value]='rangeValue'\n          labelPosition='Outside' [width]='width' (changed)='changed($event)' [theme]='theme' [tooltip]='tooltip'\n          (tooltipRender)='tooltipRender($event)' (load)='load($event)'>\n          <e-rangenavigator-series-collection>\n            <e-rangenavigator-series [dataSource]='dataSource' xName='x' yName='y' width=2 name='SL'>\n            </e-rangenavigator-series>\n          </e-rangenavigator-series-collection>\n        </ejs-rangenavigator>\n      </div> -->\n      <div align=\"center\">\n        <ejs-chart #chartDouble style='display:block;' id='chartDouble' align='center' [chartArea]='chartArea'\n          [width]='width' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxisForPitch' height='300'\n          [theme]='theme' [tooltip]='tooltip' [annotations]='annotations' (axisLabelRender)='axisLabelRender($event)'>\n          <e-series-collection>\n            <e-series [dataSource]='dataSource' name='Pitch' type='Spline' xName='x' yName='y' width='2'\n              [marker]=\"marker\" [animation]='animation'>\n            </e-series>\n          </e-series-collection>\n        </ejs-chart>\n      </div>\n    </div>\n    <label>Rolling Average (Amplitude)</label>\n    <br />\n    <div class=\"row\">\n      <div align=\"center\">\n        <ejs-chart #rollingAverageAmplitudeChart style='display:block;' id='rollingAverageAmplitudeChart' align='center'\n          [chartArea]='chartArea' [width]='width' [primaryXAxis]='primaryXAxis'\n          [primaryYAxis]='primaryYAxisForAmplitude' height='300' [theme]='theme' [tooltip]='tooltip'\n          [annotations]='annotations' (axisLabelRender)='axisLabelRender($event)'>\n          <e-series-collection>\n            <e-series [dataSource]='rollingAverageAmplitudeDataSource' name='Amplitude' type='Spline' xName='x'\n              yName='y' width='2' [marker]=\"marker\" [animation]='animation' [fill]=\"'#e74c3d'\">\n            </e-series>\n          </e-series-collection>\n        </ejs-chart>\n      </div>\n    </div>\n    <label>Rolling Average (Pitch)</label>\n    <br />\n    <div class=\"row\">\n      <div align=\"center\">\n        <ejs-chart #rollingAveragePitchChart style='display:block;' id='rollingAveragePitchChart' align='center'\n          [chartArea]='chartArea' [width]='width' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxisForPitch'\n          height='300' [theme]='theme' [tooltip]='tooltip' [annotations]='annotations'\n          (axisLabelRender)='axisLabelRender($event)'>\n          <e-series-collection>\n            <e-series [dataSource]='rollingAverageDataSource' name='Pitch' type='Spline' xName='x' yName='y' width='2'\n              [marker]=\"marker\" [animation]='animation'>\n            </e-series>\n          </e-series-collection>\n        </ejs-chart>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div style=\"position: relative\">\n  <!-- the position of the parent container must be set to relative -->\n  <!-- It is really important to set loaderId for non-master loader -->\n  <ngx-ui-loader [loaderId]=\"'loader-01'\"></ngx-ui-loader>\n</div>\n\n<div style=\"position: relative\">\n  <!-- the position of the parent container must be set to relative -->\n  <!-- It is really important to set loaderId for non-master loader -->\n  <ngx-ui-loader [loaderId]=\"'loader-02'\"></ngx-ui-loader>\n</div>\n\n<ngx-ui-loader [text]=\"'Generating chart ...'\"></ngx-ui-loader>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recordrtc */ "./node_modules/recordrtc/RecordRTC.js");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recordrtc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @amcharts/amcharts4/core */ "./node_modules/@amcharts/amcharts4/core.js");
/* harmony import */ var _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amcharts/amcharts4/charts */ "./node_modules/@amcharts/amcharts4/charts.js");
/* harmony import */ var _amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @amcharts/amcharts4/themes/animated */ "./node_modules/@amcharts/amcharts4/themes/animated.js");
/* harmony import */ var _syncfusion_ej2_charts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @syncfusion/ej2-charts */ "./node_modules/@syncfusion/ej2-charts/index.js");
/* harmony import */ var ngx_ui_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-ui-loader */ "./node_modules/ngx-ui-loader/fesm5/ngx-ui-loader.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// ej2-chart
/**
 * Sample for range navigator with numeric axis
 */
var selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
var theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark"));
var chartAnnotation = [];
chartAnnotation.push({
    content: '<div id="exchangeRate"></div>',
    coordinateUnits: "Pixel",
    region: "Chart",
    x: "85%",
    y: "15%"
});
var AppComponent = /** @class */ (function () {
    function AppComponent(elementRef, _renderer, _ngxUiLoaderService) {
        this.elementRef = elementRef;
        this._renderer = _renderer;
        this._ngxUiLoaderService = _ngxUiLoaderService;
        this.title = 'voice-recorder';
        this.audioBufferData = [];
        this.audioBufferArray = [];
        this.displayLineGraph = false;
        this.pitch = 0;
        this.bufferlength = 2048;
        this.buffer = new Float32Array(this.bufferlength);
        this.chart = [
            {
                name: 'Saw Bean',
                series: []
            }
        ];
        this.lineChartData = [
            { data: [], label: 'Pitch' },
        ];
        this.hideZeroes = true;
        this.pitchShowHideText = 'Show zeroes';
        this.pitchDataPoints = [];
        this.recordCompleted = false;
        this.isRecording = false;
        this.rollingAveragePitchDataPoints = [];
        this.startingPoint = 0;
        this.incrementSize = 0;
        this.rangeAverage = 0;
        this.rangeSize = 0;
        this.rangeFrom = 0;
        this.incrementSizeEntered = false;
        // for amplitude
        this.amplitudeDataSource = [];
        this.amplitudeRangeValue = [];
        this.rollingAverageAmplitudeDataSource = [];
        this.rollingAverageAmplitudeDataPoints = [];
        this.rollingAverageAmplitudeRange = [];
        this.primaryYAxisForAmplitude = {
            labelFormat: "{value} dB",
            title: "Amplitude",
            minimum: 0,
            maximum: 30,
            interval: 2,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        };
        this.primaryXAxis = {
            title: "Index",
            edgeLabelPlacement: "Shift",
            majorGridLines: { width: 0, color: 'blue' },
            labelFormat: "n1"
        };
        this.chartArea = { border: { width: 0 } };
        this.primaryYAxisForPitch = {
            labelFormat: "{value} Hz",
            title: "Pitch",
            minimum: 0,
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        };
        this.chartTooltip = { enable: true, shared: true };
        this.chartHeight = "350";
        this.animation = { enable: false };
        this.width = "1000px";
        this.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark"));
        this.rangeValue = [];
        this.annotations = chartAnnotation;
        this.marker = {
            visible: true,
            height: 5,
            width: 5
        };
        this.tooltip = { enable: true };
        this.legendSettings = { visible: false };
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.canvasCtx = this.canvas.nativeElement.getContext('2d');
    };
    AppComponent.prototype.startRecording = function () {
        var _this = this;
        this.recordCompleted = false;
        this.startingPoint = 0;
        this.incrementSize = 0;
        this.rangeAverage = 0;
        this.rangeSize = 0;
        this.rangeFrom = 0;
        this.incrementSizeEntered = false;
        this.rollingAveragePitchDataPoints = [];
        if (!this.isRecording) {
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
                .then(function (stream) {
                _this.streamData = stream;
                _this.isRecording = true;
                _this.source = _this.audioCtx.createMediaStreamSource(stream);
                _this.source.connect(_this.distortion);
                _this.distortion.connect(_this.biquadFilter);
                _this.biquadFilter.connect(_this.gainNode);
                _this.convolver.connect(_this.gainNode);
                _this.gainNode.connect(_this.analyser);
                _this.analyser.connect(_this.audioCtx.destination);
                var options = {
                    type: 'audio',
                    mimeType: 'audio/wav',
                };
                _this.recordRTC = recordrtc__WEBPACK_IMPORTED_MODULE_1__(stream, options);
                _this.recordRTC.startRecording();
                // let timer = 0;
                // var timerId = setInterval(() => {
                //   if (timer > 10) {
                //     this.stopRecording();
                //     clearInterval(timerId);
                //   } else {
                //     timer = timer + 1;
                //   }
                // }, 1000);
                //start the recording process 
                console.log("Recording started", _this.recordRTC);
                _this.visualize();
            });
        }
    };
    AppComponent.prototype.stopRecording = function () {
        var _this = this;
        // this._ngxUiLoaderService.start();
        this.recordCompleted = true;
        this.isRecording = false;
        this.streamData.getTracks().forEach(function (track) {
            track.stop();
        });
        this.pitchDataPoints = this.lineChartData[0]['data'];
        console.log('Line chart data: ', this.lineChartData[0]['data']);
        this.generateChartData();
        this.getAnnotaiton(this.lineChartData[0]['data'].filter(function (x) { return x != 0; }), Object(_syncfusion_ej2_charts__WEBPACK_IMPORTED_MODULE_5__["getSeriesColor"])(theme)[1]);
        this.displayLineGraph = true;
        this.audioCtx.close();
        cancelAnimationFrame(this.drawVisual);
        this.recordRTC.stopRecording(function () {
            var blob = _this.recordRTC.getBlob();
            console.log('Blob: ', blob);
            _this.createDownloadLink(blob);
        });
        // console.log('1: ', this.audioBufferArray);
        // console.log('2: ', new Uint8Array(this.audioBufferArray));
        // console.log('Record RTC: ', this.recordRTC);
        // this.createDownloadLink(new Uint8Array(this.audioBufferArray));
    };
    AppComponent.prototype.createDownloadLink = function (audioBufferArray) {
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
        var audioFile = new File([blob], filename + ".wav", {
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
        // this.au.play();
        // this.wavesurfer = WaveSurfer.create({
        //   container: document.querySelector('#waveform'),
        //   barWidth: 2,
        //   barHeight: 1, // the height of the wave
        //   barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
        //   waveColor: 'violet',
        //   progressColor: 'purple'
        // });
        // console.log('Wave surfer: ', this.wavesurfer);
        // this.wavesurfer.loadBlob(blob);
        // this.wavesurfer.on('ready', function () {
        //   this.wavesurfer.play();
        // });
    };
    AppComponent.prototype.visualize = function () {
        var _this = this;
        var WIDTH = this.canvas.nativeElement.width;
        var HEIGHT = this.canvas.nativeElement.height;
        this.analyser.fftSize = 1024;
        var bufferLength = this.analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        var freqDomain = new Float32Array(bufferLength);
        this.canvasCtx.clearRect(0, 0, 500, 100);
        var drawAlt = function () {
            // console.log("data array: ", dataArray);
            console.log("freq domain: ", freqDomain);
            console.log('Analyser: ', _this.analyser);
            // this.audioBufferData.push(Object.assign({ time: this.audioCtx.currentTime, data: dataArray }));
            // // audioBufferArray = audioBufferArray.concat([...dataArray]);
            // dataArray.forEach(x => {
            //   this.audioBufferArray.push(x);
            // });
            _this.audioBufferData.push(Object.assign({ time: _this.audioCtx.currentTime, data: freqDomain }));
            freqDomain.forEach(function (x) {
                _this.audioBufferArray.push(x);
            });
            console.log('Audio Buffer data: ', _this.audioBufferData);
            console.log('Audio Buffer array: ', _this.audioBufferArray);
            // getByteFrequencyData() -> copies current frequency data into unassigned byte array passed into it
            // this.analyser.getByteFrequencyData(dataArray);
            // this.analyser.getByteTimeDomainData(dataArray);
            _this.analyser.getFloatFrequencyData(freqDomain);
            _this.analyser.getFloatTimeDomainData(freqDomain);
            _this.drawVisual = requestAnimationFrame(drawAlt);
            _this.updatePitch();
            // this.calculateRMS(freqDomain);
            console.log('Draw visual: ', _this.drawVisual);
            _this.canvasCtx.fillStyle = '#181818'; // draw wave with canvas
            _this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            _this.canvasCtx.lineWidth = 2;
            _this.canvasCtx.strokeStyle = '#3cfd2a';
            _this.canvasCtx.beginPath();
            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {
                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT / 2;
                // console.log('V: ', v, 'Y: ', y, 'slicewidth: ', sliceWidth, 'X: ', x);
                if (i === 0) {
                    _this.canvasCtx.moveTo(x, y);
                }
                else {
                    _this.canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            _this.canvasCtx.lineTo(WIDTH, HEIGHT / 2);
            _this.canvasCtx.stroke();
        };
        drawAlt();
    };
    AppComponent.prototype.updatePitch = function () {
        var _this = this;
        this.analyser.getFloatTimeDomainData(this.buffer);
        var ac = this.autoCorrelate(this.buffer, this.audioCtx.sampleRate);
        console.log('AC: ', ac);
        if (ac == -1) {
            console.log('Pitch <<<: ', ac);
            this.pitch = 0;
        }
        else {
            this.pitch = ac;
        }
        console.log('Amplitude decibel value: ', 10 * Math.log10(ac));
        console.log('Pitch: ', this.pitch);
        var time = 0;
        var sec = 1000;
        var interval = setInterval(function () {
            time += sec;
            if (_this.audioCtx.state == 'running') {
                _this.lineChartData[0]['data'].push(_this.pitch.toFixed(2));
            }
            else {
                clearInterval(interval);
            }
        }, sec);
    };
    AppComponent.prototype.autoCorrelate = function (buf, sampleRate) {
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
            if (Math.abs(buf[i]) < thres) {
                r1 = i;
                break;
            }
        for (var i = 1; i < SIZE / 2; i++)
            if (Math.abs(buf[SIZE - i]) < thres) {
                r2 = SIZE - i;
                break;
            }
        buf = buf.slice(r1, r2);
        SIZE = buf.length;
        var c = new Array(SIZE).fill(0);
        for (var i = 0; i < SIZE; i++)
            for (var j = 0; j < SIZE - i; j++)
                c[i] = c[i] + buf[j] * buf[j + i];
        var d = 0;
        while (c[d] > c[d + 1])
            d++;
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
        if (a)
            T0 = T0 - b / (2 * a);
        return sampleRate / T0;
    };
    AppComponent.prototype.generateChartData = function () {
        _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["useTheme"](_amcharts_amcharts4_themes_animated__WEBPACK_IMPORTED_MODULE_4__["default"]);
        this.amChart = _amcharts_amcharts4_core__WEBPACK_IMPORTED_MODULE_2__["create"]("chartdiv", _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYChart"]);
        this.amChart.paddingRight = 20;
        var data = [];
        if (this.hideZeroes) {
            for (var i = 1; i < this.pitchDataPoints.length; i++) {
                if (this.pitchDataPoints[i] != 0)
                    data.push({ category: i, value: this.pitchDataPoints[i] });
            }
        }
        else {
            for (var i = 1; i < this.pitchDataPoints.length; i++) {
                data.push({ category: i, value: this.pitchDataPoints[i] });
            }
        }
        this.amChart.data = data;
        // Create axes
        this.categoryAxis = this.amChart.xAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["CategoryAxis"]());
        this.categoryAxis.dataFields.category = "category";
        this.categoryAxis.renderer.grid.template.location = 0;
        this.valueAxis = this.amChart.yAxes.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["ValueAxis"]());
        // Create series
        this.series = this.amChart.series.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["LineSeries"]());
        this.series.dataFields.valueY = "value";
        this.series.dataFields.categoryX = "category";
        this.series.tooltipText = "{valueY}";
        this.series.strokeWidth = 3;
        this.series.xAxis = this.categoryAxis;
        this.series.tensionX = 0.77;
        this.series.bullets.push(new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["CircleBullet"]());
        this.amChart.cursor = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYCursor"]();
        this.scrollbarX = new _amcharts_amcharts4_charts__WEBPACK_IMPORTED_MODULE_3__["XYChartScrollbar"]();
        this.scrollbarX.series.push(this.series);
        this.amChart.scrollbarX = this.scrollbarX;
        // console.log('Scroll bar: ', this.scrollbarX);
        // console.log('Series: ', this.series);
        this.amChart = this.amChart;
    };
    AppComponent.prototype.togglePitchDisplay = function () {
        this.hideZeroes = !this.hideZeroes;
        if (this.hideZeroes) {
            this.pitchShowHideText = 'Show zeroes';
            this.lineChartData[0]['data'] = this.lineChartData[0]['data'].filter(function (x) { return x != 0; });
        }
        else {
            this.pitchShowHideText = 'Hide zeroes';
            this.lineChartData[0]['data'] = this.pitchDataPoints;
        }
        this.generateChartData();
        this.getAnnotaiton(this.lineChartData[0]['data'], Object(_syncfusion_ej2_charts__WEBPACK_IMPORTED_MODULE_5__["getSeriesColor"])(theme)[1]);
        this.calculateRollingAverage();
    };
    AppComponent.prototype.toggleScroll = function () {
        console.log('Toggle scrolled:');
    };
    AppComponent.prototype.getAnnotaiton = function (args, color) {
        console.log('Args: ', args);
        args = args.map(function (data, i) {
            return {
                x: i + 1,
                y: parseFloat(data)
            };
        });
        console.log('args:ASDasd', args);
        for (var i = 0; i < args.length; i++) {
            chartAnnotation.push({
                x: args[i]["x"],
                y: args[i]["y"],
                coordinateUnits: "Point"
            });
        }
        this.rangeValue = [args[0]['x'], args[args.length - 1]['x']];
        this.dataSource = args;
        this.generateAmplitudeChart(this.dataSource);
        console.log('Range value: ', this.rangeValue);
        console.log('data source: ', this.dataSource);
    };
    AppComponent.prototype.axisLabelRender = function (args) {
        if (args.axis.orientation === "Horizontal") {
            var value = Math.abs(Number(args.text));
            args.text = String(value);
        }
    };
    AppComponent.prototype.tooltipRender = function (args) {
        args.text[0] = Math.round(parseInt(args.text[0], 10)).toString();
    };
    AppComponent.prototype.load = function (args) {
        args.rangeNavigator.rangeTooltipModule = new _syncfusion_ej2_charts__WEBPACK_IMPORTED_MODULE_5__["RangeTooltip"](args.rangeNavigator);
    };
    AppComponent.prototype.changed = function (args) {
        this.rangeAverage = 0;
        console.log("Changed: ", args);
        this.Chart.primaryXAxis.zoomFactor = args.zoomFactor;
        this.Chart.primaryXAxis.zoomPosition = args.zoomPosition;
        this.Chart.dataBind();
        var sum = 0;
        for (var i = 0; i < args.selectedData.length; i++) {
            sum += args.selectedData[i]['y'];
        }
        // this.rangeValue = [Math.round(args.start), Math.round(args.end)];
        // console.log('Range value: ', this.rangeValue);
        this.rangeAverage = Math.round((sum / args.selectedData.length + Number.EPSILON) * 100) / 100;
        console.log('Average pitch: ', this.rangeAverage);
    };
    AppComponent.prototype.addToRollingAverage = function () {
        var _this = this;
        var index = this.rollingAveragePitchDataPoints.findIndex(function (x) { return x == _this.rangeAverage; });
        if (!Number.isNaN(this.rangeAverage)) {
            if (index > -1) {
                if (window.confirm("The pitch is already in the list. Are you sure you want to add it again?")) {
                    this.rollingAveragePitchDataPoints.push(this.rangeAverage);
                }
            }
            else {
                this.rollingAveragePitchDataPoints.push(this.rangeAverage);
                this.rangeValue = [this.rangeFrom, this.rangeFrom + this.rangeSize];
                this.rangeFrom = this.rangeFrom + this.rangeSize;
            }
            console.log('Rolling average data [points]: ', this.rollingAveragePitchDataPoints);
            this.generateRollingAverageChart(this.rollingAveragePitchDataPoints);
        }
    };
    AppComponent.prototype.generateRollingAverageChart = function (args) {
        console.log('Args: ', args);
        args = args.map(function (data, i) {
            return {
                x: i + 1,
                y: parseFloat(data)
            };
        });
        console.log('Rolling average data points source: ', args);
        for (var i = 0; i < args.length; i++) {
            chartAnnotation.push({
                x: args[i]["x"],
                y: args[i]["y"],
                coordinateUnits: "Point"
            });
        }
        this.rollingAverageDataSource = args;
        this.rollingAverageAmplitudeDataSource = args.map(function (data, i) {
            return {
                x: i + 1,
                y: (10 * Math.log10(parseFloat(data['y']))) == -Infinity ? 0 : (10 * Math.log10(parseFloat(data['y'])))
            };
        });
        console.log('Rolling average pitch data source: ', this.rollingAverageDataSource);
        console.log('Rolling average amplitude data source: ', this.rollingAverageAmplitudeDataSource);
    };
    AppComponent.prototype.changeIncrementSize = function ($event) {
        this.incrementSizeEntered = true;
        if (parseInt($event.target.value) > 0) {
            this.incrementSize = parseInt($event.target.value);
            // this.startingPoint = parseInt($event.target.value);
            // this.rangeValue = [this.startingPoint, this.rangeValue[1]];
        }
        else {
            this.incrementSize = 1;
        }
    };
    AppComponent.prototype.changeRangeSize = function ($event) {
        if (parseInt($event.target.value) > 0) {
            this.rangeSize = parseInt($event.target.value);
            this.rangeValue = [this.startingPoint, this.startingPoint + this.rangeSize];
        }
        else {
            this.rangeSize = 0;
        }
    };
    AppComponent.prototype.calculateRollingAverage = function () {
        this.rollingAveragePitchDataPoints = [];
        console.log('asdasd: ', this.dataSource);
        console.log('123123: ', Math.round(this.dataSource.length * this.rangeSize) / this.rangeSize);
        // let z = 0;
        for (var i = this.startingPoint; i < Math.round(this.dataSource.length * this.rangeSize) / this.rangeSize; i = i + this.incrementSize) {
            var sum = 0;
            console.log('i: ', i);
            // z = i;
            // console.log('Range Average::::::::::::::::', this.rangeAverage);
            //       this.rangeAverage = Math.round((sum / args.selectedData.length + Number.EPSILON) * 100) / 100;
            // console.log('Average pitch: ', this.rangeAverage);
            for (var j = i; j < i + this.rangeSize; j++) {
                if (this.dataSource[j]) {
                    sum += this.dataSource[j]['y'];
                }
            }
            // this.rangeAverage = sum / this.rangeSize;
            this.rangeAverage = Math.round((sum / this.rangeSize + Number.EPSILON) * 100) / 100;
            console.log('Average pitch: ', this.rangeAverage);
            this.rollingAveragePitchDataPoints.push(this.rangeAverage);
            console.log('Roll: ', this.rollingAveragePitchDataPoints);
            this.generateRollingAverageChart(this.rollingAveragePitchDataPoints);
        }
    };
    // for amplitude
    AppComponent.prototype.generateAmplitudeChart = function (array) {
        console.log('Amplitude array: ', array);
        array = array.map(function (data, i) {
            return {
                x: i + 1,
                y: (10 * Math.log10(parseFloat(data['y']))) == -Infinity ? 0 : (10 * Math.log10(parseFloat(data['y'])))
            };
        });
        console.log('Amplitude args:', array);
        this.amplitudeDataSource = array;
    };
    // RMS -> Root Mean Squared
    AppComponent.prototype.calculateRMS = function (array) {
        var rms = Math.sqrt(array
            .map(function (val) { return (val * val); })
            .reduce(function (acum, val) { return acum + val; })
            / array.length);
        console.log('RMS value: ', rms);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myCanvas'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AppComponent.prototype, "canvas", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("chartDouble"),
        __metadata("design:type", _syncfusion_ej2_charts__WEBPACK_IMPORTED_MODULE_5__["Chart"])
    ], AppComponent.prototype, "Chart", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            ngx_ui_loader__WEBPACK_IMPORTED_MODULE_6__["NgxUiLoaderService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _syncfusion_ej2_angular_grids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @syncfusion/ej2-angular-grids */ "./node_modules/@syncfusion/ej2-angular-grids/@syncfusion/ej2-angular-grids.es5.js");
/* harmony import */ var _syncfusion_ej2_angular_buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @syncfusion/ej2-angular-buttons */ "./node_modules/@syncfusion/ej2-angular-buttons/@syncfusion/ej2-angular-buttons.es5.js");
/* harmony import */ var _syncfusion_ej2_angular_charts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @syncfusion/ej2-angular-charts */ "./node_modules/@syncfusion/ej2-angular-charts/@syncfusion/ej2-angular-charts.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_ui_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-ui-loader */ "./node_modules/ngx-ui-loader/fesm5/ngx-ui-loader.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _syncfusion_ej2_angular_charts__WEBPACK_IMPORTED_MODULE_6__["ChartAllModule"],
                _syncfusion_ej2_angular_charts__WEBPACK_IMPORTED_MODULE_6__["RangeNavigatorAllModule"],
                _syncfusion_ej2_angular_grids__WEBPACK_IMPORTED_MODULE_4__["GridAllModule"],
                _syncfusion_ej2_angular_buttons__WEBPACK_IMPORTED_MODULE_5__["ButtonAllModule"],
                _syncfusion_ej2_angular_buttons__WEBPACK_IMPORTED_MODULE_5__["SwitchAllModule"],
                ngx_ui_loader__WEBPACK_IMPORTED_MODULE_8__["NgxUiLoaderModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/novelty/programming/POC/audio-recording-app/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map