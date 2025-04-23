export const NotificationType = {
    POST : 'POST',
    COMMENT : 'COMMENT',    
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

export const NotificationTypeText = {
    POST : '게시글',
    COMMENT : '댓글'
} as const;

export function getNotificationTypeText(type: NotificationType): string {
    return NotificationTypeText[type] || '';
}
