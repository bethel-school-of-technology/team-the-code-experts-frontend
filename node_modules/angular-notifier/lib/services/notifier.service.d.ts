import { Observable } from 'rxjs';
import { NotifierAction } from '../models/notifier-action.model';
import { NotifierConfig } from '../models/notifier-config.model';
import { NotifierNotificationOptions } from '../models/notifier-notification.model';
import { NotifierQueueService } from './notifier-queue.service';
import * as i0 from "@angular/core";
/**
 * Notifier service
 *
 * This service provides access to the public notifier API. Once injected into a component, directive, pipe, service, or any other building
 * block of an applications, it can be used to show new notifications, and hide existing ones. Internally, it transforms API calls into
 * actions, which then get thrown into the action queue - eventually being processed at the right moment.
 */
export declare class NotifierService {
    /**
     * Notifier queue service
     */
    private readonly queueService;
    /**
     * Notifier configuration
     */
    private readonly config;
    /**
     * Constructor
     *
     * @param notifierQueueService Notifier queue service
     * @param config               Notifier configuration, optionally injected as a dependency
     */
    constructor(notifierQueueService: NotifierQueueService, config: NotifierConfig);
    /**
     * Get the notifier configuration
     *
     * @returns Notifier configuration
     */
    getConfig(): NotifierConfig;
    /**
     * Get the observable for handling actions
     *
     * @returns Observable of NotifierAction
     */
    get actionStream(): Observable<NotifierAction>;
    /**
     * API: Show a new notification
     *
     * @param notificationOptions Notification options
     */
    show(notificationOptions: NotifierNotificationOptions): void;
    /**
     * API: Hide a specific notification, given its ID
     *
     * @param notificationId ID of the notification to hide
     */
    hide(notificationId: string): void;
    /**
     * API: Hide the newest notification
     */
    hideNewest(): void;
    /**
     * API: Hide the oldest notification
     */
    hideOldest(): void;
    /**
     * API: Hide all notifications at once
     */
    hideAll(): void;
    /**
     * API: Shortcut for showing a new notification
     *
     * @param type             Type of the notification
     * @param message          Message of the notification
     * @param [notificationId] Unique ID for the notification (optional)
     */
    notify(type: string, message: string, notificationId?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotifierService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotifierService>;
}
