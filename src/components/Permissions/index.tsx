import { getPermissions } from 'api';
import { ResourceActionsDto, ResourcePermissionDto } from 'api/modules/authorization/dto/resource-permission.dto';
import { entityInitialLimit, entityInitialPage } from 'constant-values';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { Divider } from 'shared/components/Divider';
import { Flex } from 'shared/components/Flex';
import LimitSelector from 'shared/components/LimitSelector';
import Loader from 'shared/components/Loader';
import Paginator from 'shared/components/Paginator';
import { Stack } from 'shared/components/Stack';
import { useEntityState } from 'shared/hooks/useEntityState';
import { useLoadEntityPaginated } from 'shared/hooks/useLoadEntityPaginated';
import { Route } from 'shared/UrlRoute';
import { replaceEntity } from 'util/replaceEntity';
import { Status } from 'util/status';
import Permission from './Permission';
import * as Styled from './styled';

const Permissions = () => {
  const [page, setPage] = useState(entityInitialPage);
  const [limit, setLimit] = useState(entityInitialLimit);

  const [state, setState] = useEntityState<ResourcePermissionDto>();
  const { items: permissions, paginationData, status, error } = state;

  useLoadEntityPaginated(getPermissions, setState, page, limit);

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(entityInitialPage);
  };

  const handleUpdate = async (id: string, changed: ResourceActionsDto) => {
    const updatedItems = replaceEntity(state.items, id, changed);
    if (updatedItems) {
      setState({
        ...state,
        items: updatedItems,
      });
    }
  };

  const handleDelete = (id: string) => {
    setState({
      ...state,
      items: state.items.filter(entity => entity.id !== id),
    });
  };

  if (status === Status.Idle) return null;
  if (status === Status.Loading) return <Loader />;

  return (
    <Styled.Container
      header={
        <Flex gap={true}>
          <Link to={Route.Dashboard.PermissionsNew}>
            <Button>Create new</Button>
          </Link>
          <Divider />
          <LimitSelector value={limit} onChange={handleLimitChange}></LimitSelector>
        </Flex>
      }
      content={
        <Stack gap={true}>
          {permissions.map(p => (
            <Permission
              permission={p}
              key={p.id}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            ></Permission>
          ))}
        </Stack>
      }
      footer={
        paginationData && (
          <Paginator
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            maxDisplayedPages={5}
            onGoToPage={page => setPage(page)}
          ></Paginator>
        )
      }
    />
  );
};

export default Permissions;
