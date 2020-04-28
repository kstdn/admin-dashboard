import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPathname } from 'store/selectors';
import styled from 'styled-components/macro';

const StyledBreadcrumbs = styled.div`
  font-size: smaller;
`;

const StyledLink = styled(Link)`
  text-transform: capitalize;
  display: inline-block;

  &:not(:last-of-type):after {
    content: "/";
    margin-inline-start: var(--base-padding);
    margin-inline-end: 8px;
  }
`;

type PathSegment = { label: string; path: string };

const getPathSegments = (pathname: string): PathSegment[] => {
  return pathname
    .split('/')
    .filter(Boolean)
    .reduce<PathSegment[]>((aggr, currSegment) => {
      const aggrSegment = aggr[aggr.length - 1]?.path;
      const path = aggrSegment ? `${aggrSegment}/${currSegment}` : `/${currSegment}`;
      aggr.push({
        label: currSegment,
        path,
      });
      return aggr;
    }, []);
};

const Breadcrumbs = () => {
  const pathname = useSelector(getPathname);

  const pathSegments: PathSegment[] = getPathSegments(pathname);

  return (
    <StyledBreadcrumbs>
      {pathSegments.map(s => (
        <StyledLink to={s.path} key={s.path}>
          {s.label}
        </StyledLink>
      ))}
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
