'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">asc-workspace documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AscSharedLibsModule.html" data-type="entity-link" >AscSharedLibsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AscSharedLibsModule-fb873e367af10d715648949db3e99da5f1ded6a895c813e52c129f1d81c195ea98a1200275f868e53ac906d220e254f378952eae82aaabb7e4674cdc7092a032"' : 'data-bs-target="#xs-components-links-module-AscSharedLibsModule-fb873e367af10d715648949db3e99da5f1ded6a895c813e52c129f1d81c195ea98a1200275f868e53ac906d220e254f378952eae82aaabb7e4674cdc7092a032"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AscSharedLibsModule-fb873e367af10d715648949db3e99da5f1ded6a895c813e52c129f1d81c195ea98a1200275f868e53ac906d220e254f378952eae82aaabb7e4674cdc7092a032"' :
                                            'id="xs-components-links-module-AscSharedLibsModule-fb873e367af10d715648949db3e99da5f1ded6a895c813e52c129f1d81c195ea98a1200275f868e53ac906d220e254f378952eae82aaabb7e4674cdc7092a032"' }>
                                            <li class="link">
                                                <a href="components/AscSharedLibsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AscSharedLibsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BaseTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BaseTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/GetLabels.html" data-type="entity-link" >GetLabels</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelStateModel.html" data-type="entity-link" >LabelStateModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AscSharedLibsService.html" data-type="entity-link" >AscSharedLibsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FakeLabelService.html" data-type="entity-link" >FakeLabelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FakeRequestService.html" data-type="entity-link" >FakeRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelService.html" data-type="entity-link" >LabelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LabelState.html" data-type="entity-link" >LabelState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableConfigService.html" data-type="entity-link" >TableConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TextService.html" data-type="entity-link" >TextService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ILabelService.html" data-type="entity-link" >ILabelService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestService.html" data-type="entity-link" >IRequestService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});