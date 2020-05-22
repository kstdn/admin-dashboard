export type ResourceDto = {
  id: string;
  name: string;
}

export type ResourceActionsDto = {
  createOwn: boolean;
  readOwn: boolean;
  updateOwn: boolean;
  deleteOwn: boolean;
  createAny: boolean;
  readAny: boolean;
  updateAny: boolean;
  deleteAny: boolean;
}

export type ResourcePermissionDto = ResourceActionsDto & {
  id: string;
  resourceId: string;
  resourceName: string;
  userId?: string;
  userUsername?: string;
  roleId?: string;
  roleName?: string;
}