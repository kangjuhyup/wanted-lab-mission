export const NotificationType = {
    POST : 'POST',
    COMMENT : 'COMMENT',    
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];
