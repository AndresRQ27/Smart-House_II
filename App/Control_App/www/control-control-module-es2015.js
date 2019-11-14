(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["control-control-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/control/control.page.html":
/*!*********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/control/control.page.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar color=\"primary\">\n        <ion-buttons slot=\"start\">\n            <ion-back-button defaultHref=\"/\"></ion-back-button>\n          </ion-buttons>\n      <ion-title>\n        Control Panel\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n  \n  <ion-content>\n  <ion-grid>\n    \n      <ion-row>\n        <img  src=\"{{photoImg}}\">\n      </ion-row>\n    <ion-card>\n      <ion-item>\n        <ion-label color=\"#0000ff\">Lights color</ion-label>\n        <ion-select value=0 okText=\"Okay\" cancelText=\"Dismiss\" #C [(ngModel)]=\"C.value\" (ngModelChange)=\"onUpdateColor(C.value)\">\n          <ion-select-option value=0>Off</ion-select-option>\n          <ion-select-option value=1>Red</ion-select-option>\n          <ion-select-option value=2>Green</ion-select-option>\n          <ion-select-option value=3>Blue</ion-select-option>\n          <ion-select-option value=4>Yellow</ion-select-option>\n          <ion-select-option value=5>Orange</ion-select-option>\n          <ion-select-option value=6>Purple</ion-select-option>\n          <ion-select-option value=7>Pink</ion-select-option>\n          <ion-select-option value=8>White</ion-select-option>\n          <ion-select-option value=9>Cyan</ion-select-option>\n        </ion-select>\n      </ion-item>\n       \n    </ion-card>\n   \n\n    <ion-row>\n        <ion-col>\n            <ion-fab>\n                <ion-fab-button (click)=onVideo() color=\"medium\">\n                  <ion-icon name=\"videocam\"></ion-icon>\n                </ion-fab-button>\n              </ion-fab>\n        </ion-col>\n        <ion-col>\n            <ion-fab>\n                <ion-fab-button (click)=onPhoto() color=\"medium\">\n                  <ion-icon name=\"camera\"></ion-icon>\n                </ion-fab-button>\n              </ion-fab>\n        </ion-col>\n        <ion-col>\n            <ion-fab>\n                <ion-fab-button (click)=onAlarm() color=\"danger\">\n                  <ion-icon name={{iconAlarm}}></ion-icon>\n                </ion-fab-button>\n              </ion-fab>\n        </ion-col>\n        <ion-col>\n            <ion-fab>\n                <ion-fab-button (click)=onLock() color=\"success\">\n                  <ion-icon name={{iconLock}}></ion-icon>\n                </ion-fab-button>\n              </ion-fab>\n        </ion-col>\n  </ion-row>\n\n  </ion-grid>\n  </ion-content>\n  "

/***/ }),

/***/ "./src/app/control/control.module.ts":
/*!*******************************************!*\
  !*** ./src/app/control/control.module.ts ***!
  \*******************************************/
/*! exports provided: ControlPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPageModule", function() { return ControlPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _control_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./control.page */ "./src/app/control/control.page.ts");







const routes = [
    {
        path: '',
        component: _control_page__WEBPACK_IMPORTED_MODULE_6__["ControlPage"]
    }
];
let ControlPageModule = class ControlPageModule {
};
ControlPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_control_page__WEBPACK_IMPORTED_MODULE_6__["ControlPage"]]
    })
], ControlPageModule);



/***/ }),

/***/ "./src/app/control/control.page.scss":
/*!*******************************************!*\
  !*** ./src/app/control/control.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRyb2wvY29udHJvbC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/control/control.page.ts":
/*!*****************************************!*\
  !*** ./src/app/control/control.page.ts ***!
  \*****************************************/
/*! exports provided: ControlPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPage", function() { return ControlPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _connection_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../connection.service */ "./src/app/connection.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let ControlPage = class ControlPage {
    constructor(connectionServices, router, http) {
        //   this.id = setInterval(() => {
        this.connectionServices = connectionServices;
        this.router = router;
        this.http = http;
        this.photoImg = 'assets/picture.png';
        this.iconAlarm = 'notifications';
        this.iconLock = 'unlock';
        //     const params = new HttpParams().set('update', '');
        //     this.http.get('http://' + this.connectionServices.getIP() + ':' + 
        //     this.connectionServices.getPort() + '/', {params}).subscribe((data:any) => {
        //       //console.log(data);
        //       this.dataObject = data;
        //       this.stateRoom1 = this.dataObject['bed1'] ? this.lightOn : this.lightOff;
        //       this.stateRoom2 = this.dataObject['bed2'] ? this.lightOn : this.lightOff;
        //       this.stateKitchen = this.dataObject['kitchen'] ? this.lightOn : this.lightOff;
        //       this.stateLivingRoom = this.dataObject['living'] ? this.lightOn : this.lightOff;
        //       this.stateDiner = this.dataObject['dining'] ? this.lightOn : this.lightOff;
        //       this.stateDoor1 = this.dataObject['door1'] ? this.openedDoor : this.closedDoor;
        //       this.stateDoor2 = this.dataObject['door2'] ? this.openedDoor : this.closedDoor;
        //       this.stateDoor3 = this.dataObject['door3'] ? this.openedDoor : this.closedDoor;
        //       this.stateDoor4 = this.dataObject['door4'] ? this.openedDoor : this.closedDoor;
        //   });
        // }, 100);//every second
        //update all status
    }
    onPhoto() {
        console.log("Photo");
        this.photoImg = 'http://' + this.connectionServices.getIP() + ':' +
            this.connectionServices.getPort() + '/image?' + new Date().getTime();
    }
    onVideo() {
        console.log("Video");
        window.location.href = 'http://' + this.connectionServices.getIP() + ':5000' + '/';
    }
    onAlarm() {
        console.log("Alarm");
        const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]().set('alarm', '');
        this.http.get('http://' + this.connectionServices.getIP() + ':' +
            this.connectionServices.getPort() + '/', { params }).subscribe((data) => {
            console.log(data);
            this.dataObject = data;
            this.iconAlarm = this.dataObject['state'] ? 'notifications-off' : 'notifications';
        });
    }
    onLock() {
        console.log("Lock");
        const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]().set('lock', '');
        this.http.get('http://' + this.connectionServices.getIP() + ':' +
            this.connectionServices.getPort() + '/', { params }).subscribe((data) => {
            console.log(data);
            this.dataObject = data;
            this.iconLock = this.dataObject['state'] ? 'lock' : 'unlock';
        });
    }
    onUpdateColor(value) {
        console.log("Lights turned to " + value);
        const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]().set('light', value);
        this.http.get('http://' + this.connectionServices.getIP() + ':' +
            this.connectionServices.getPort() + '/', { params }).subscribe((data) => {
            console.log(data);
        });
    }
};
ControlPage.ctorParameters = () => [
    { type: _connection_service__WEBPACK_IMPORTED_MODULE_2__["ConnectionService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
ControlPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-control',
        template: __webpack_require__(/*! raw-loader!./control.page.html */ "./node_modules/raw-loader/index.js!./src/app/control/control.page.html"),
        styles: [__webpack_require__(/*! ./control.page.scss */ "./src/app/control/control.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_connection_service__WEBPACK_IMPORTED_MODULE_2__["ConnectionService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
], ControlPage);



/***/ })

}]);
//# sourceMappingURL=control-control-module-es2015.js.map