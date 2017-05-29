"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var core_2 = require("@ngx-translate/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
/**
 * Service that set up the local and g7 translation that will be used in the whole app.
 * For more information see https://github.com/ngx-translate/core.
 *
 * Usage:
 *  with pipes: <div>{{ 'OLÁ MUNDO' | translate }}</div>
 *  with directives: <div translate>OLÁ MUNDO</div>
 *  with attributes: <div translate="OLÁ MUNDO"></div>
 *  with filters: translate.get('OLÁ MUNDO').subscribe((res: string) => console.log(res););
 *
 */
var TranslateG7Service = (function () {
    function TranslateG7Service(translateService, http) {
        this.translateService = translateService;
        this.http = http;
        this.defaultUsedLanguage = 'pt_BR';
    }
    TranslateG7Service.prototype.setDefaultEnUsTranslation = function (defaultEnUsTranslation) {
        this.defaultEnUsTranslation = defaultEnUsTranslation;
    };
    TranslateG7Service.prototype.setDefaultEsEsTranslation = function (defaultEsEsTranslation) {
        this.defaultEsEsTranslation = defaultEsEsTranslation;
    };
    TranslateG7Service.prototype.setDefaultPtBrTranslation = function (defaultPtBrTranslation) {
        this.defaultPtBrTranslation = defaultPtBrTranslation;
    };
    TranslateG7Service.prototype.setDefaultUsedLanguage = function (defaultUsedLanguage) {
        this.defaultUsedLanguage = defaultUsedLanguage;
    };
    /**
     * Setup local and external translations
     */
    TranslateG7Service.prototype.configTranslation = function () {
        if (!this.defaultEnUsTranslation)
            this.defaultEnUsTranslation = {};
        if (!this.defaultPtBrTranslation)
            this.defaultPtBrTranslation = {};
        if (!this.defaultEsEsTranslation)
            this.defaultEsEsTranslation = {};
        //Merge front-end default translation with g7 platform translations
        Object.assign(this.defaultEnUsTranslation, this.getTranslationFromPortal('en_US'));
        Object.assign(this.defaultPtBrTranslation, this.getTranslationFromPortal('pt_BR'));
        Object.assign(this.defaultEsEsTranslation, this.getTranslationFromPortal('es_ES'));
        this.translateService.addLangs(['en_US', 'pt_BR', 'es_ES']);
        this.translateService.setTranslation('en_US', this.defaultEnUsTranslation);
        this.translateService.setTranslation('pt_BR', this.defaultPtBrTranslation);
        this.translateService.setTranslation('es_ES', this.defaultEsEsTranslation);
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translateService.setDefaultLang('pt_BR');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translateService.use(this.defaultUsedLanguage); //TODO: waiting when pcbnu002050 gets updated(23/05) so the locale g7 services will be available
    };
    /**
     * Method for retrieving the translation from the g7 platform accordingly with the local language
     */
    TranslateG7Service.prototype.getTranslationFromPortal = function (lang) {
        //mock
        var languages = {
            'en_US': { "OLÁ MUNDO": "hello world" },
            'es_ES': { "OLÁ MUNDO": "holla mundo" },
            'pt_BR': { "OLÁ MUNDO": "olá mundo" }
        };
        return languages[lang];
        // TODO: waiting when pcbnu002050 gets updated(23/05) so the translation g7 services will be available
        // const SERVICE_NAME = "hcm";
        // const DOMAIN_NAME = "hcm";
        // let url = 'platform/translation_hub/queries/getTranslationBundle?domainName='
        //   .concat(DOMAIN_NAME)
        //   .concat('&serviceName=')
        //   .concat(SERVICE_NAME)
        //   .concat('&format=FLAT_JSON');
        // this.getTranslation(url).subscribe(translation => this.translationG7 = translation);
        // return this.translationG7;
    };
    /**
     * Get translation from http request platform
     * @param {String} url
     */
    TranslateG7Service.prototype.getTranslation = function (url) {
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return TranslateG7Service;
}());
TranslateG7Service = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_2.TranslateService, http_1.Http])
], TranslateG7Service);
exports.TranslateG7Service = TranslateG7Service;
//# sourceMappingURL=translate-g7.service.js.map