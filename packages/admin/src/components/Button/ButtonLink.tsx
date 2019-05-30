import * as React from 'react';
import { Link } from 'react-router-dom';
import Ink from 'react-ink';
import styled from 'styled-components';

import { Color, Size } from './modules/constants';
import style, { StyleProps } from './modules/style';

const StyledLink = styled(Link)<StyleProps>`
  ${style};
  text-decoration: none;
  display: inline-block;
`;

type Props = StyleProps & {
  to: string,
  className?: string,
  children: React.ReactNode,
};

const ButtonLink = ({
  color, size, rounded, block,
  disabled, fab, to,
  className, children,
}: Props) =>  (
  <StyledLink
    color={color}
    size={size}
    rounded={rounded}
    block={block}
    disabled={disabled}
    fab={fab}
    to={to}
    className={className}
  >
    {!disabled && <Ink />}
    {children}
  </StyledLink>
);

ButtonLink.defaultProps = {
  color: Color.MAIN,
  size: Size.DEFAULT,
};

export default ButtonLink;
