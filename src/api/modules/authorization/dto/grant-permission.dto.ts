export type GrantPermissionDto = {
  createOwn: boolean;
  readOwn: boolean;
  updateOwn: boolean;
  deleteOwn: boolean;
  createAny: boolean;
  readAny: boolean;
  updateAny: boolean;
  deleteAny: boolean;
};
