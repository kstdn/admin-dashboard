export type ResourceDto = {
  id: string;
  name: string;
}

export type ResourcePermission = {
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