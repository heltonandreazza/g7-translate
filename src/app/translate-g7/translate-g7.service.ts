import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
@Injectable()
export class TranslateG7Service {
  private translationG7: any;
  private defaultEnUsTranslation: any;
  private defaultEsEsTranslation: any;
  private defaultPtBrTranslation: any;
  private defaultUsedLanguage: string = 'pt_BR';

  constructor(private translateService: TranslateService, private http: Http) {
  }

  setDefaultEnUsTranslation(defaultEnUsTranslation: any) {
    this.defaultEnUsTranslation = defaultEnUsTranslation;
  }

  setDefaultEsEsTranslation(defaultEsEsTranslation: any) {
    this.defaultEsEsTranslation = defaultEsEsTranslation;
  }

  setDefaultPtBrTranslation(defaultPtBrTranslation: any) {
    this.defaultPtBrTranslation = defaultPtBrTranslation;
  }

  setDefaultUsedLanguage(defaultUsedLanguage: string) {
    this.defaultUsedLanguage = defaultUsedLanguage;
  }

  /**
   * Setup local and external translations
   */
  configTranslation() {
    if (!this.defaultEnUsTranslation) this.defaultEnUsTranslation = {};
    if (!this.defaultPtBrTranslation) this.defaultPtBrTranslation = {};
    if (!this.defaultEsEsTranslation) this.defaultEsEsTranslation = {};

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
  }

  /**
   * Method for retrieving the translation from the g7 platform accordingly with the local language
   */
  getTranslationFromPortal(lang) {
    //mock
    const languages = {
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
  }

  /**
   * Get translation from http request platform
   * @param {String} url 
   */
  private getTranslation(url) {
    return this.http.get(url)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

}
