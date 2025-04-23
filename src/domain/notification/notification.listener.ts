import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from './service/notification.service';
import { NotificationPostPayload } from './payload/notification.post.payload';
import { NotificationCommentPayload } from './payload/notification.comment.payload';

@Injectable()
export class NotificationListener {

  constructor(
    private readonly notifcationService : NotificationService
  ) {}

  @OnEvent('notification.post.keyword')
  async handleKeywordEvent(payload: NotificationPostPayload) {
    const entities = await this.notifcationService.findKeywords(payload.text);
    await this.notifcationService.createNotifications(1, entities);
  }

  @OnEvent('notification.comment.keyword')
  async handleCommentKeywordEvent(payload: NotificationCommentPayload) {
    const entities = await this.notifcationService.findKeywords(payload.text);
    await this.notifcationService.createNotifications(2, entities);
  }
}
