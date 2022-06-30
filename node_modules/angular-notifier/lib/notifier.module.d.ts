import { ModuleWithProviders } from '@angular/core';
import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';
import * as i0 from "@angular/core";
import * as i1 from "./components/notifier-container.component";
import * as i2 from "./components/notifier-notification.component";
import * as i3 from "@angular/common";
/**
 * Factory for a notifier configuration with custom options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @param   options - Custom notifier options
 * @returns - Notifier configuration as result
 */
export declare function notifierCustomConfigFactory(options: NotifierOptions): NotifierConfig;
/**
 * Factory for a notifier configuration with default options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @returns - Notifier configuration as result
 */
export declare function notifierDefaultConfigFactory(): NotifierConfig;
/**
 * Notifier module
 */
export declare class NotifierModule {
    /**
     * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
     *
     * @param   [options={}] - Custom notifier options
     * @returns - Notifier module with custom providers
     */
    static withConfig(options?: NotifierOptions): ModuleWithProviders<NotifierModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotifierModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NotifierModule, [typeof i1.NotifierContainerComponent, typeof i2.NotifierNotificationComponent], [typeof i3.CommonModule], [typeof i1.NotifierContainerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NotifierModule>;
}
