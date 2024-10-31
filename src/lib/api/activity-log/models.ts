export const Actions = {
  CLICK: 'click',
  SCROLL: 'scroll',
  ADDED_VALUE: 'added_value',
  CHANGED_VALUE: 'changed_value',
  REMOVED_VALUE: 'removed_value',
} as const;

export type Action = (typeof Actions)[keyof typeof Actions];

export const ComponentTypes = {
  BUTTON: 'button',
  INPUT: 'input',
  LINK: 'link',
} as const;

export type ComponentType =
  (typeof ComponentTypes)[keyof typeof ComponentTypes];

export type CreateActivityLogPayload = {
  action: Action;
  componentType: ComponentType | null;
  value: string | null;
  location: string;
};

export type ActivityLog = {
  id: string;
  userId: string;
  user: {
    firstname: string;
    lastname: string;
    imageUrl: string | null;
  };
  action: Action;
  componentType: ComponentType | null;
  value: string | null;
  location: string;
  createdAt: string;
};
