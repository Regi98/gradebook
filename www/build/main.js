webpackJsonp([9],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reset_password_reset_password__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_email_login_email__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = (function () {
    function Login(navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl, authData, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.nav = nav;
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    Login.prototype.loginUser = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            var uname = this.loginForm.value.email;
            var email = uname + "@jcfc-gradebook.com";
            this.authData.loginUser(email, this.loginForm.value.password).then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    Login.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__signup_signup__["a" /* Signup */]);
    };
    Login.prototype.goToResetPassword = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__reset_password_reset_password__["a" /* ResetPassword */]);
    };
    Login.prototype.goToLoginEmail = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__login_email_login_email__["a" /* LoginEmailPage */]);
    };
    return Login;
}());
Login = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\login\login.html"*/'<!--\n\n  Generated template for the Login page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content id="login" center text-center padding>\n\n\n\n     <form [formGroup]="loginForm" (submit)="loginUser()" novalidate>\n\n         <!--divs-->\n\n            <div class="row responsive-md">\n\n                <div class="col col-50 col-offset-25">\n\n                  <img src="assets/img/logo.png" alt="JCFC LOGO" width=150px>\n\n                        <!---->\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Username</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your username" \n\n        [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n\n      <p>Please enter a valid username.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Password</ion-label>\n\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n\n      <p>Your password needs more than 6 characters.</p>\n\n    </ion-item>\n\n\n\n    <button ion-button color="secondary" block type="submit">\n\n      Login\n\n    </button>\n\n    <button ion-button color="dark" block (click)="goToLoginEmail()">\n\n      Login with email\n\n    </button>\n\n    <button ion-button color="dark" block clear (click)="goToResetPassword()">\n\n      Reset my password\n\n    </button>\n\n\n\n   </div>\n\n    </div>\n\n\n\n  </form>\n\n\n\n   \n\n    \n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], Login);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassword; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ResetPassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ResetPassword = (function () {
    function ResetPassword(authData, formBuilder, nav, loadingCtrl, alertCtrl) {
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.resetPasswordForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
        });
    }
    /**
     * If the form is valid it will call the AuthData service to reset the user's password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    ResetPassword.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authData.resetPassword(this.resetPasswordForm.value.email).then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: "We just sent you a reset link to your email",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: function () {
                                _this.nav.pop();
                            }
                        }
                    ]
                });
                alert.present();
            }, function (error) {
                var errorMessage = error.message;
                var errorAlert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                errorAlert.present();
            });
        }
    };
    return ResetPassword;
}());
ResetPassword = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
        selector: 'page-reset-password',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\reset-password\reset-password.html"*/'<!--\n  Generated template for the ResetPassword page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Password Reset</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n     <form [formGroup]="resetPasswordForm" (submit)="resetPassword()" novalidate>\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n        [class.invalid]="!resetPasswordForm.controls.email.valid && resetPasswordForm.controls.email.dirty">\n        </ion-input>\n    </ion-item>\n    <ion-item class="error-message" \n      *ngIf="!resetPasswordForm.controls.email.valid  && resetPasswordForm.controls.email.dirty">\n      <p>Please enter a valid email.</p>\n    </ion-item>\n\n    <button ion-button block type="submit" color="yellow">\n      Reset your Password\n    </button>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\reset-password\reset-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
], ResetPassword);

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account-settings/account-settings.module": [
		527,
		8
	],
	"../pages/average/average.module": [
		528,
		7
	],
	"../pages/reset-password/reset-password.module": [
		529,
		6
	],
	"../pages/select-quarter/select-quarter.module": [
		530,
		5
	],
	"../pages/select-subject/select-subject.module": [
		531,
		4
	],
	"../pages/signup/signup.module": [
		535,
		3
	],
	"../pages/subject-average/subject-average.module": [
		532,
		2
	],
	"../pages/subject-summary/subject-summary.module": [
		533,
		1
	],
	"../pages/summary/summary.module": [
		534,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 181;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectQuarterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_subject_select_subject__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__summary_summary__ = __webpack_require__(343);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SelectQuarterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SelectQuarterPage = (function () {
    function SelectQuarterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SelectQuarterPage.prototype.openSelectSubjectPage = function (value) {
        var data1 = {
            quarter: value
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__select_subject_select_subject__["a" /* SelectSubjectPage */], data1);
    };
    SelectQuarterPage.prototype.openSummaryPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__summary_summary__["a" /* SummaryPage */]);
    };
    SelectQuarterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectQuarterPage');
    };
    return SelectQuarterPage;
}());
SelectQuarterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-select-quarter',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\select-quarter\select-quarter.html"*/'<!--\n  Generated template for the SelectQuarterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title>Grade Book</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n  <button ion-item (click)="openSelectSubjectPage(\'First-Quarter\')" class="item-icon-right">\n    First Quarter\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button>\n  <button ion-item (click)="openSelectSubjectPage(\'Second-Quarter\')" class="item-icon-right">\n    Second Quarter\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSelectSubjectPage(\'Third-Quarter\')" class="item-icon-right">\n    Third Quarter\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSelectSubjectPage(\'Fourth-Quarter\')" class="item-icon-right">\n    Fourth Quarter <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n</ion-list>\n<button ion-button block color="light" (click)="openSummaryPage()" padding>\n  Grade Summary\n</button>\n </ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\select-quarter\select-quarter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SelectQuarterPage);

//# sourceMappingURL=select-quarter.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectSubjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grades_grades__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SelectSubjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SelectSubjectPage = (function () {
    function SelectSubjectPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SelectSubjectPage.prototype.openGradesPage = function (value) {
        var sent = this.navParams.get('quarter');
        var data2 = {
            subject: value,
            quarter: sent
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__grades_grades__["a" /* GradesPage */], data2);
    };
    SelectSubjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectSubjectPage');
    };
    return SelectSubjectPage;
}());
SelectSubjectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-select-subject',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\select-subject\select-subject.html"*/'<!--\n  Generated template for the SelectSubjectPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title>Select Subject</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list no-lines>\n  <button ion-item (click)="openGradesPage(\'Araling Panlipunan\')" class="item-icon-right">\n    Araling Panlipunan\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button>\n  <button ion-item (click)="openGradesPage(\'Home Economics\')" class="item-icon-right">\n    Economics\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openGradesPage(\'English\')" class="item-icon-right">\n    English\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openGradesPage(\'ESP\')" class="item-icon-right">\n    ESP <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openGradesPage(\'Filipino\')"class="item-icon-right">\n    Filipino\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button>\n  <button ion-item (click)="openGradesPage(\'MAPEH\')" class="item-icon-right">\n    MAPEH\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openGradesPage(\'Math\')" class="item-icon-right">\n    Math\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openGradesPage(\'Science\')" class="item-icon-right">\n    Science <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\select-subject\select-subject.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SelectSubjectPage);

//# sourceMappingURL=select-subject.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Item */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GradesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Item = (function () {
    function Item() {
    }
    return Item;
}());

var GradesPage = (function () {
    function GradesPage(navCtrl, navParams, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.items = [];
        this.keys = [];
        this.afAuth.authState.subscribe(function (user) {
            if (user)
                console.log(user.uid);
        });
    }
    GradesPage.prototype.ionViewDidLoad = function () {
        this.quarter = this.navParams.get('quarter');
        this.subject = this.navParams.get('subject');
        this.items = [];
        this.keys = [];
        var sectionCode;
        var section;
        var mySubject = this.subject;
        var myQuarter = this.quarter;
        var myItem = this.items;
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref("Students");
        ref.on('value', function (snap) {
            sectionCode = snap.child(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid + '/sectionCode').val();
            console.log(sectionCode); //
            var studRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref().child('Sections').orderByChild('sectionCode').equalTo(sectionCode);
            studRef.on('value', function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                    var username = userSnapshot.val();
                    console.log(username.secName);
                    section = username.secName;
                    //DAta all together reference	
                    var itemRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/' + mySubject + '/' + section + '/' + myQuarter + '/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    console.log(myQuarter + mySubject + section + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    itemRef.on('value', function (itemSnapshot) {
                        itemSnapshot.forEach(function (itemSnap) {
                            var itemSnapKey = itemSnap.key.replace('!', '');
                            myItem.push({ key: itemSnapKey, value: itemSnap.val() });
                            return false;
                        });
                    });
                    return false;
                });
            });
        });
        //var itemRef = firebase.database().ref('AP-Grades/Section-7A/w1FqmxkmWTc8dxLzNnblWleYoU93/First-Quarter');
    };
    return GradesPage;
}());
GradesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-grades',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\grades\grades.html"*/'<!--\n  Generated template for the GradesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title>My Grades</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list no-lines>\n  <ion-item-divider style="font-weight: bold" text-center color="light">{{quarter}}<br>{{subject}}</ion-item-divider>\n\n  <ion-item class="text" *ngFor="let item of items">\n  	<div style="font-weight: bold" item-left>{{item.key}}</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\grades\grades.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
], GradesPage);

//# sourceMappingURL=grades.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subject_summary_subject_summary__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SummaryPage = (function () {
    function SummaryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SummaryPage.prototype.openSubjectSummaryPage = function (value) {
        var data3 = {
            subject: value
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__subject_summary_subject_summary__["a" /* SubjectSummaryPage */], data3);
    };
    SummaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SummaryPage');
    };
    return SummaryPage;
}());
SummaryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-summary',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\summary\summary.html"*/'<!--\n  Generated template for the SummaryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title>Choose subject</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n<ion-list no-lines>\n  <button ion-item (click)="openSubjectSummaryPage(\'Araling Panlipunan\')" class="item-icon-right">\n    Araling Panlipunan\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button>\n  <button ion-item (click)="openSubjectSummaryPage(\'Home Economics\')" class="item-icon-right">\n    Economics\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSubjectSummaryPage(\'English\')" class="item-icon-right">\n    English\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSubjectSummaryPage(\'ESP\')" class="item-icon-right">\n    ESP <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSubjectSummaryPage(\'Filipino\')"class="item-icon-right">\n    Filipino\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button>\n  <button ion-item (click)="openSubjectSummaryPage(\'MAPEH\')" class="item-icon-right">\n    MAPEH\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSubjectSummaryPage(\'Math\')" class="item-icon-right">\n    Math\n    <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n  <button ion-item (click)="openSubjectSummaryPage(\'Science\')" class="item-icon-right">\n    Science <ion-icon name="arrow-dropright" item-right></ion-icon>\n  </button> \n</ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\summary\summary.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SummaryPage);

//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SubjectSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubjectSummaryPage = (function () {
    function SubjectSummaryPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.first = [];
        this.second = [];
        this.third = [];
        this.fourth = [];
    }
    SubjectSummaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubjectSummaryPage');
        this.subject = this.navParams.get('subject');
        var sectionCode;
        var section;
        var mySubject = this.subject;
        var myFirst = this.first;
        var mySecond = this.second;
        var myThird = this.third;
        var myFourth = this.fourth;
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref("Students");
        ref.on('value', function (snap) {
            sectionCode = snap.child(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid + '/sectionCode').val();
            console.log(sectionCode); //
            var studRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref().child('Sections').orderByChild('sectionCode').equalTo(sectionCode);
            studRef.on('value', function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                    var username = userSnapshot.val();
                    console.log(username.secName);
                    section = username.secName;
                    var firstRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/' + mySubject + '/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var secondRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/' + mySubject + '/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var thirdRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/' + mySubject + '/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var fourthRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/' + mySubject + '/' + section + '/FourthQuarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    console.log(mySubject + section + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    firstRef.on('value', function (itemSnapshot) {
                        itemSnapshot.forEach(function (itemSnap) {
                            var itemSnapKey = itemSnap.key.replace('!', '');
                            myFirst.push({ key: itemSnapKey, value: itemSnap.val() });
                            return false;
                        });
                    });
                    secondRef.on('value', function (itemSnapshot) {
                        itemSnapshot.forEach(function (itemSnap) {
                            var itemSnapKey = itemSnap.key.replace('!', '');
                            mySecond.push({ key: itemSnapKey, value: itemSnap.val() });
                            return false;
                        });
                    });
                    thirdRef.on('value', function (itemSnapshot) {
                        itemSnapshot.forEach(function (itemSnap) {
                            var itemSnapKey = itemSnap.key.replace('!', '');
                            myThird.push({ key: itemSnapKey, value: itemSnap.val() });
                            return false;
                        });
                    });
                    fourthRef.on('value', function (itemSnapshot) {
                        itemSnapshot.forEach(function (itemSnap) {
                            var itemSnapKey = itemSnap.key.replace('!', '');
                            myFourth.push({ key: itemSnapKey, value: itemSnap.val() });
                            return false;
                        });
                    });
                    return false;
                });
            });
        });
    };
    return SubjectSummaryPage;
}());
SubjectSummaryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-subject-summary',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\subject-summary\subject-summary.html"*/'<!--\n  Generated template for the SubjectSummaryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="secondary">\n    <ion-title>{{subject}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list no-lines>\n<ion-item-divider style="font-weight: bold" text-center color="light">First Quarter</ion-item-divider>\n  <ion-item class="text" *ngFor="let item of first">\n  	<div style="font-weight: bold" item-left>{{item.key}}</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n <ion-item-divider style="font-weight: bold" text-center color="light">Second Quarter</ion-item-divider>\n  <ion-item class="text" *ngFor="let item of second">\n  	<div style="font-weight: bold" item-left>{{item.key}}</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n <ion-item-divider style="font-weight: bold" text-center color="light">Third Quarter</ion-item-divider>\n  <ion-item class="text" *ngFor="let item of third">\n  	<div style="font-weight: bold" item-left>{{item.key}}</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n <ion-item-divider style="font-weight: bold" text-center color="light">Fourth Quarter</ion-item-divider>\n  <ion-item class="text" *ngFor="let item of fourth">\n  	<div style="font-weight: bold" item-left>{{item.key}}</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\subject-summary\subject-summary.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SubjectSummaryPage);

//# sourceMappingURL=subject-summary.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the AccountSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AccountSettingsPage = (function () {
    function AccountSettingsPage(navCtrl, navParams, formBuilder, alertCtrl, toast, loadingCtrl, authData, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.nav = nav;
        this.newPassForm = formBuilder.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
        }, { validator: this.matchingPasswords('password', 'confirmPassword') });
        this.emailForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])]
        });
    }
    AccountSettingsPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    };
    AccountSettingsPage.prototype.changeEmail = function () {
        var _this = this;
        var user = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().currentUser;
        user.updateEmail(this.emailForm.value.email).then(function (user) {
            _this.loading.dismiss().then(function () {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            });
        }, function (error) {
            _this.loading.dismiss().then(function () {
                var alert = _this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        });
        this.toast.create({
            message: 'You have successfully changed your email!',
            duration: 4000
        }).present();
        this.loading = this.loadingCtrl.create();
        this.loading.present();
    };
    AccountSettingsPage.prototype.changePassword = function () {
        var _this = this;
        var user = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().currentUser;
        if (!this.newPassForm.valid) {
            console.log(this.newPassForm.value);
        }
        else {
            user.updatePassword(this.newPassForm.value.password).then(function (user) {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                });
                __WEBPACK_IMPORTED_MODULE_6_firebase_app__["database"]().ref("Students/" + __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().currentUser.uid).update({
                    password: _this.newPassForm.value.password
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.toast.create({
                message: 'You have successfully changed your password!',
                duration: 4000
            }).present();
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    AccountSettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountSettingsPage');
    };
    return AccountSettingsPage;
}());
AccountSettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-account-settings',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\account-settings\account-settings.html"*/'<!--\n  Generated template for the AccountSettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>Account Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="emailForm" (submit)="changeEmail()" novalidate>\n    <h6><strong>Note:</strong></h6>\n    <p>Once you\'ve changed your email, you can only login with email on your next visit.</p>\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n        [class.invalid]="!emailForm.controls.email.valid && emailForm.controls.email.dirty">\n        </ion-input>\n    </ion-item>\n    <ion-item class="error-message" \n      *ngIf="!emailForm.controls.email.valid  && emailForm.controls.email.dirty">\n      <p>Your email has bad format.</p>\n    </ion-item>\n    <button ion-button color="dark" block type="submit">\n      Change Email\n    </button>\n  </form>\n	<form [formGroup]="newPassForm" (submit)="changePassword()" novalidate>\n         <!--divs-->\n            <div class="row responsive-md">\n                <div class="col col-50 col-offset-25">\n         <!---->\n    <ion-item>\n      <ion-label stacked>New Password</ion-label>\n      <ion-input #password formControlName="password" type="password" placeholder="Enter new password" \n        [class.invalid]="!newPassForm.controls.password.valid && newPassForm.controls.password.dirty">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Repeat Password</ion-label>\n      <ion-input #confirmPassword formControlName="confirmPassword" type="password" placeholder="Confirm Password" \n        [class.invalid]="!newPassForm.controls.password.valid && newPassForm.controls.password.dirty">\n      </ion-input>\n    </ion-item>\n    <ion-item class="error-message" \n      *ngIf="!newPassForm.controls.password.valid  && newPassForm.controls.password.dirty">\n      <p>Your password needs more than 6 characters.</p>\n    </ion-item>\n    <ion-item class="error-message" *ngIf="newPassForm.controls.confirmPassword.touched && newPassForm.hasError(\'mismatchedPasswords\') && newPassForm.controls.password.valid">\n        <p>Passwords do not match.</p>\n    </ion-item>\n    \n    <button ion-button color="secondary" block type="submit">\n      Change Password\n    </button>\n<hr>\n\n\n   </div>\n    </div>\n\n  </form>\n  \n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\account-settings\account-settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AccountSettingsPage);

//# sourceMappingURL=account-settings.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectAveragePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SubjectAveragePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubjectAveragePage = (function () {
    function SubjectAveragePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ap = [];
        this.ap1 = [];
        this.ap2 = [];
        this.ap3 = [];
        this.eco = [];
        this.eco1 = [];
        this.eco2 = [];
        this.eco3 = [];
        this.eng = [];
        this.eng1 = [];
        this.eng2 = [];
        this.eng3 = [];
        this.esp = [];
        this.esp1 = [];
        this.esp2 = [];
        this.esp3 = [];
        this.fil = [];
        this.fil1 = [];
        this.fil2 = [];
        this.fil3 = [];
        this.mapeh = [];
        this.mapeh1 = [];
        this.mapeh2 = [];
        this.mapeh3 = [];
        this.math = [];
        this.math1 = [];
        this.math2 = [];
        this.math3 = [];
        this.sci = [];
        this.sci1 = [];
        this.sci2 = [];
        this.sci3 = [];
    }
    SubjectAveragePage.prototype.ionViewDidLoad = function () {
        var sectionCode;
        var section;
        var myAp = this.ap;
        var myAp1 = this.ap1;
        var myAp2 = this.ap2;
        var myAp3 = this.ap3;
        var myEco = this.eco;
        var myEco1 = this.eco1;
        var myEco2 = this.eco2;
        var myEco3 = this.eco3;
        var myEng = this.eng;
        var myEng1 = this.eng1;
        var myEng2 = this.eng2;
        var myEng3 = this.eng3;
        var myesp = this.esp;
        var myesp1 = this.esp1;
        var myesp2 = this.esp2;
        var myesp3 = this.esp3;
        var myfil = this.fil;
        var myfil1 = this.fil1;
        var myfil2 = this.fil2;
        var myfil3 = this.fil3;
        var mymapeh = this.mapeh;
        var mymapeh1 = this.mapeh1;
        var mymapeh2 = this.mapeh2;
        var mymapeh3 = this.mapeh3;
        var mymath = this.math;
        var mymath1 = this.math1;
        var mymath2 = this.math2;
        var mymath3 = this.math3;
        var mysci = this.sci;
        var mysci1 = this.sci1;
        var mysci2 = this.sci2;
        var mysci3 = this.sci3;
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref("Students");
        ref.on('value', function (snap) {
            sectionCode = snap.child(__WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid + '/sectionCode').val();
            console.log(sectionCode); //
            var studRef = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref().child('Sections').orderByChild('sectionCode').equalTo(sectionCode);
            studRef.on('value', function (snapshot) {
                snapshot.forEach(function (userSnapshot) {
                    var username = userSnapshot.val();
                    console.log(username.secName);
                    section = username.secName;
                    var apRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Araling Panlipunan/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var apRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Araling Panlipunan/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var apRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Araling Panlipunan/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var apRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Araling Panlipunan/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var ecoRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Economics/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var ecoRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Economics/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var ecoRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Economics/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var ecoRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Economics/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var engRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/English/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var engRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/English/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var engRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/English/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var engRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/English/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var espRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/ESP/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var espRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/ESP/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var espRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/ESP/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var espRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/ESP/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var filRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Filipino/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var filRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Filipino/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var filRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Filipino/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var filRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Filipino/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mapehRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/MAPEH/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mapehRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/MAPEH/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mapehRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/MAPEH/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mapehRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/MAPEH/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mathRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Math/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mathRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Math/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mathRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Math/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var mathRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Math/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var sciRef1 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Science/' + section + '/First-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var sciRef2 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Science/' + section + '/Second-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var sciRef3 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Science/' + section + '/Third-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    var sciRef4 = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/Science/' + section + '/Fourth-Quarter/' + __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().currentUser.uid);
                    apRef1.on('value', function (snapshot) {
                        myAp.push({ value: snapshot.child('QGRADE').val() });
                    });
                    apRef2.on('value', function (snapshot) {
                        myAp1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    apRef3.on('value', function (snapshot) {
                        myAp2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    apRef4.on('value', function (snapshot) {
                        myAp3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    ecoRef1.on('value', function (snapshot) {
                        myEco.push({ value: snapshot.child('QGRADE').val() });
                    });
                    ecoRef2.on('value', function (snapshot) {
                        myEco1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    ecoRef3.on('value', function (snapshot) {
                        myEco2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    ecoRef4.on('value', function (snapshot) {
                        myEco3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    engRef1.on('value', function (snapshot) {
                        myEng.push({ value: snapshot.child('QGRADE').val() });
                    });
                    engRef2.on('value', function (snapshot) {
                        myEng1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    engRef3.on('value', function (snapshot) {
                        myEng2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    engRef4.on('value', function (snapshot) {
                        myEng3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    espRef1.on('value', function (snapshot) {
                        myesp.push({ value: snapshot.child('QGRADE').val() });
                    });
                    espRef2.on('value', function (snapshot) {
                        myesp1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    espRef3.on('value', function (snapshot) {
                        myesp2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    espRef4.on('value', function (snapshot) {
                        myesp3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    filRef1.on('value', function (snapshot) {
                        myfil.push({ value: snapshot.child('QGRADE').val() });
                    });
                    filRef2.on('value', function (snapshot) {
                        myfil1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    filRef3.on('value', function (snapshot) {
                        myfil2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    filRef4.on('value', function (snapshot) {
                        myfil3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mapehRef1.on('value', function (snapshot) {
                        mymapeh.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mapehRef2.on('value', function (snapshot) {
                        mymapeh1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mapehRef3.on('value', function (snapshot) {
                        mymapeh2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mapehRef4.on('value', function (snapshot) {
                        mymapeh3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mathRef1.on('value', function (snapshot) {
                        mymath.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mathRef2.on('value', function (snapshot) {
                        mymath1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mathRef3.on('value', function (snapshot) {
                        mymath2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    mathRef4.on('value', function (snapshot) {
                        mymath3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    sciRef1.on('value', function (snapshot) {
                        mysci.push({ value: snapshot.child('QGRADE').val() });
                    });
                    sciRef2.on('value', function (snapshot) {
                        mysci1.push({ value: snapshot.child('QGRADE').val() });
                    });
                    sciRef3.on('value', function (snapshot) {
                        mysci2.push({ value: snapshot.child('QGRADE').val() });
                    });
                    sciRef4.on('value', function (snapshot) {
                        mysci3.push({ value: snapshot.child('QGRADE').val() });
                    });
                    return false;
                });
            });
        });
    };
    return SubjectAveragePage;
}());
SubjectAveragePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-subject-average',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\subject-average\subject-average.html"*/'<!--\n  Generated template for the SubjectAveragePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="yellow">\n    <ion-title>Grades Overview</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list no-lines>\n  <ion-item-divider style="font-weight: bold" text-center color="light">Araling Panlipunan</ion-item-divider>\n  <ion-item *ngFor="let item of ap">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of ap1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of ap2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of ap3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">Economics</ion-item-divider>\n  <ion-item *ngFor="let item of eco">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eco1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eco2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eco3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">English</ion-item-divider>\n  <ion-item *ngFor="let item of eng">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eng1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eng2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of eng3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">ESP</ion-item-divider>\n  <ion-item *ngFor="let item of esp">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of esp1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of esp2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of esp3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">Filipino</ion-item-divider>\n  <ion-item *ngFor="let item of fil">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of fil1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of fil2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of fil3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">MAPEH</ion-item-divider>\n  <ion-item *ngFor="let item of mapeh">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of mapeh1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of mapeh2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of mapeh3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">Math</ion-item-divider>\n  <ion-item *ngFor="let item of math">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of math1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of math2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of math3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item-divider style="font-weight: bold" text-center color="light">Science</ion-item-divider>\n  <ion-item *ngFor="let item of sci">\n    <div style="font-weight: bold" item-left>First Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of sci1">\n    <div style="font-weight: bold" item-left>Second Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of sci2">\n    <div style="font-weight: bold" item-left>Third Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n  <ion-item *ngFor="let item of sci3">\n    <div style="font-weight: bold" item-left>Fourth Qtr.</div>\n    <div item-right>{{item.value}}</div>\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\subject-average\subject-average.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], SubjectAveragePage);

//# sourceMappingURL=subject-average.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginEmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*

 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginEmailPage = (function () {
    function LoginEmailPage(navCtrl, navParams, formBuilder, alertCtrl, loadingCtrl, authData, nav) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authData = authData;
        this.nav = nav;
        this.loginEmailForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginEmailPage.prototype.loginEmailUser = function () {
        var _this = this;
        if (!this.loginEmailForm.valid) {
            console.log(this.loginEmailForm.value);
        }
        else {
            var email = this.loginEmailForm.value.email;
            this.authData.loginUser(email, this.loginEmailForm.value.password).then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    LoginEmailPage.prototype.goToResetPassword = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__reset_password_reset_password__["a" /* ResetPassword */]);
    };
    return LoginEmailPage;
}());
LoginEmailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\login-email\login-email.html"*/'<!--\n  Generated template for the Login page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>Login with Email</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content id="login-email" center text-center padding>\n\n     <form [formGroup]="loginEmailForm" (submit)="loginEmailUser()" novalidate>\n         <!--divs-->\n            <div class="row responsive-md">\n                <div class="col col-50 col-offset-25">\n                  <img src="assets/img/logo.png" alt="JCFC LOGO" width=150px>\n                        <!---->\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input #email formControlName="email" type="email" placeholder="Your email" \n        [class.invalid]="!loginEmailForm.controls.email.valid && loginEmailForm.controls.email.dirty"></ion-input>\n    </ion-item>\n    <ion-item class="error-message" \n      *ngIf="!loginEmailForm.controls.email.valid  && loginEmailForm.controls.email.dirty">\n      <p>Please enter a valid email.</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n        [class.invalid]="!loginEmailForm.controls.password.valid && loginEmailForm.controls.password.dirty"></ion-input>\n    </ion-item>\n    <ion-item class="error-message" \n      *ngIf="!loginEmailForm.controls.password.valid  && loginEmailForm.controls.password.dirty">\n      <p>Your password needs more than 6 characters.</p>\n    </ion-item>\n\n    <button ion-button color="dark" block type="submit">\n      Login\n    </button>\n    <button ion-button color="dark" block clear (click)="goToResetPassword()">\n      Reset my password\n    </button>\n\n   </div>\n    </div>\n\n  </form>\n\n   \n    \n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\login-email\login-email.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_data__["a" /* AuthData */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], LoginEmailPage);

//# sourceMappingURL=login-email.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Signup = (function () {
    function Signup(nav, authData, formBuilder, loadingCtrl, alertCtrl) {
        this.nav = nav;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.signupForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    Signup.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
                .then(function () {
                _this.loading.dismiss().then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    return Signup;
}());
Signup = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\signup\signup.html"*/'<!--\n  Generated template for the Signup page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n     <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Email</ion-label>\n\n      <ion-input #email formControlName="email" type="email" placeholder="Your email address" \n\n        [class.invalid]="!signupForm.controls.email.valid && signupForm.controls.email.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.email.valid  && signupForm.controls.email.dirty">\n\n      <p>Please enter a valid email.</p>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label stacked>Password</ion-label>\n\n      <ion-input #password formControlName="password" type="password" placeholder="Your password" \n\n        [class.invalid]="!signupForm.controls.password.valid && signupForm.controls.password.dirty">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item class="error-message" \n\n      *ngIf="!signupForm.controls.password.valid  && signupForm.controls.password.dirty">\n\n      <p>Your password needs more than 6 characters.</p>\n\n    </ion-item>\n\n\n\n    <button ion-button block type="submit">\n\n      Create an Account\n\n    </button>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_data__["a" /* AuthData */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], Signup);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-left></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(376);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_select_quarter_select_quarter__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_select_subject_select_subject__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_grades_grades__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_account_settings_account_settings__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_summary_summary__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_subject_summary_subject_summary__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_subject_average_subject_average__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_average_average__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_email_login_email__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_reset_password_reset_password__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_http__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_firebase_firebase__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_auth__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_auth_data__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







 //


















var config = {
    apiKey: "AIzaSyA7FJGZU2bmSehOqRB7imV-0pzOTb0U2c8",
    authDomain: "gradebook-9320d.firebaseapp.com",
    databaseURL: "https://gradebook-9320d.firebaseio.com",
    projectId: "gradebook-9320d",
    storageBucket: "gradebook-9320d.appspot.com",
    messagingSenderId: "943972164291"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_18__pages_reset_password_reset_password__["a" /* ResetPassword */],
            __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* Signup */],
            __WEBPACK_IMPORTED_MODULE_8__pages_select_quarter_select_quarter__["a" /* SelectQuarterPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_select_subject_select_subject__["a" /* SelectSubjectPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_grades_grades__["a" /* GradesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_account_settings_account_settings__["a" /* AccountSettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_summary_summary__["a" /* SummaryPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_subject_summary_subject_summary__["a" /* SubjectSummaryPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_subject_average_subject_average__["a" /* SubjectAveragePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_average_average__["a" /* AveragePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_login_email_login_email__["a" /* LoginEmailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_20__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/account-settings/account-settings.module#AccountSettingsPageModule', name: 'AccountSettingsPage', segment: 'account-settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/average/average.module#AveragePageModule', name: 'AveragePage', segment: 'average', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordModule', name: 'ResetPassword', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/select-quarter/select-quarter.module#SelectQuarterPageModule', name: 'SelectQuarterPage', segment: 'select-quarter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/select-subject/select-subject.module#SelectSubjectPageModule', name: 'SelectSubjectPage', segment: 'select-subject', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subject-average/subject-average.module#SubjectAveragePageModule', name: 'SubjectAveragePage', segment: 'subject-average', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/subject-summary/subject-summary.module#SubjectSummaryPageModule', name: 'SubjectSummaryPage', segment: 'subject-summary', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/summary/summary.module#SummaryPageModule', name: 'SummaryPage', segment: 'summary', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup/signup.module#SignupModule', name: 'Signup', segment: 'signup', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_22_angularfire2__["a" /* AngularFireModule */].initializeApp(config)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_18__pages_reset_password_reset_password__["a" /* ResetPassword */],
            __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* Signup */],
            __WEBPACK_IMPORTED_MODULE_8__pages_select_quarter_select_quarter__["a" /* SelectQuarterPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_select_subject_select_subject__["a" /* SelectSubjectPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_grades_grades__["a" /* GradesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_account_settings_account_settings__["a" /* AccountSettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_summary_summary__["a" /* SummaryPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_subject_summary_subject_summary__["a" /* SubjectSummaryPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_subject_average_subject_average__["a" /* SubjectAveragePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_average_average__["a" /* AveragePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_login_email_login_email__["a" /* LoginEmailPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_25__providers_auth_data__["a" /* AuthData */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_23__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_24_angularfire2_auth__["a" /* AngularFireAuth */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp() {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* Login */];
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyA7FJGZU2bmSehOqRB7imV-0pzOTb0U2c8",
            authDomain: "gradebook-9320d.firebaseapp.com",
            databaseURL: "https://gradebook-9320d.firebaseio.com",
            projectId: "gradebook-9320d",
            storageBucket: "gradebook-9320d.appspot.com",
            messagingSenderId: "943972164291"
        };
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.initializeApp(config);
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (!user) {
                console.log("not login");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* Login */];
            }
            else {
                console.log("login");
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
            }
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthData = (function () {
    function AuthData() {
    }
    /**
     * [loginUser We'll take an email and password and log the user into the firebase app]
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
    AuthData.prototype.loginUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    /**
     * [signupUser description]
     * This function will take the user's email and password and create a new account on the Firebase app, once it does
     * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
     * that node to store the profile information.
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
    AuthData.prototype.signupUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
            // firebase.database().ref('/users').child(email).set({
            //    firstName: "anonymous",
            //   id:newUser.uid,
            // });
            __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/userProfile').child(newUser.uid).set({
                firstName: "anonymous",
                email: email
            });
        });
    };
    /**
     * [resetPassword description]
     * This function will take the user's email address and send a password reset link, then Firebase will handle the
     * email reset part, you won't have to do anything else.
     *
     * @param  {string} email    [User's email address]
     */
    AuthData.prototype.resetPassword = function (email) {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().sendPasswordResetEmail(email);
    };
    /**
     * This function doesn't take any params, it just logs the current user out of the app.
     */
    AuthData.prototype.logoutUser = function () {
        return __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().signOut();
    };
    return AuthData;
}());
AuthData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AuthData);

//# sourceMappingURL=auth-data.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_data__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__select_quarter_select_quarter__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__account_settings_account_settings__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__subject_average_subject_average__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = (function () {
    function HomePage(navCtrl, afAuth, toast, authData) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.toast = toast;
        this.authData = authData;
    }
    HomePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.afAuth.authState.subscribe(function (data) {
            _this.toast.create({
                message: 'Successfully connected.',
                duration: 4000
            }).present();
        });
        var fullname;
        var ref = __WEBPACK_IMPORTED_MODULE_8_firebase_app__["database"]().ref("Students");
        ref.on('value', function (snap) {
            _this.fullname = snap.child(__WEBPACK_IMPORTED_MODULE_8_firebase_app__["auth"]().currentUser.uid + '/fullName').val();
            console.log(_this.fullname);
        });
    };
    HomePage.prototype.openSelectQuarterPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__select_quarter_select_quarter__["a" /* SelectQuarterPage */]);
    };
    HomePage.prototype.openSettingsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__account_settings_account_settings__["a" /* AccountSettingsPage */]);
    };
    HomePage.prototype.openSubjectAveragePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__subject_average_subject_average__["a" /* SubjectAveragePage */]);
    };
    HomePage.prototype.logOut = function () {
        var _this = this;
        this.authData.logoutUser().then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* Login */]);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <ion-title>Home</ion-title>\n    <ion-buttons end>\n      <button (click)="logOut()" ion-button icon-only>\n        <ion-icon name="ios-log-out-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content center text-center padding>\n  <br>\n	<img src="assets/img/download.jpg" alt="JCFC LOGO" width=130px><br>\n   <h2>Hello, {{fullname}}</h2>\n   <p>What would you like to do?</p>\n\n   <br><br><br>\n\n   <button ion-button block color="secondary" (click)="openSelectQuarterPage()" padding>\n      <ion-icon name="ios-book"></ion-icon> &nbsp;&nbsp;View Grades\n   </button>\n\n   <button ion-button block color="yellow" (click)="openSubjectAveragePage()">\n      <ion-icon name="ios-checkmark-circle"></ion-icon> &nbsp;&nbsp;General Average \n   </button>\n\n   <br><br><br>\n   <button ion-button block color="dark" (click)="openSettingsPage()">\n      <ion-icon name="ios-settings"></ion-icon> &nbsp;&nbsp;Account Settings \n   </button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_data__["a" /* AuthData */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AveragePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AveragePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AveragePage = (function () {
    function AveragePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AveragePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AveragePage');
    };
    return AveragePage;
}());
AveragePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-average',template:/*ion-inline-start:"C:\Users\Sony\Desktop\hApp\src\pages\average\average.html"*/'<!--\n  Generated template for the AveragePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>average</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sony\Desktop\hApp\src\pages\average\average.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], AveragePage);

//# sourceMappingURL=average.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var FirebaseProvider = (function () {
    function FirebaseProvider(afd) {
        this.afd = afd;
    }
    FirebaseProvider.prototype.getAPgrades = function () {
        return this.afd.list('/AP-Grades/Section-7A1/');
    };
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], FirebaseProvider);

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
        if (re) {
            return null;
        }
        return { "invalidEmail": true };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ })

},[361]);
//# sourceMappingURL=main.js.map