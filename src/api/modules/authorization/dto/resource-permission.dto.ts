export type ResourceDto = {
  id: string;
  name: string;
}

export type ResourcePermissionDto = {
  id: string;
  resourceId: string;
  resource: ResourceDto;
  userId?: string;
  roleId?: string;
  createOwn: boolean;
  readOwn: boolean;
  updateOwn: boolean;
  deleteOwn: boolean;
  createAny: boolean;
  readAny: boolean;
  updateAny: boolean;
  deleteAny: boolean;
}