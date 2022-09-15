/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Icon } from '..';
import { IconNames } from '../Icon';
import Flex from '../styledComponents/Flex';
import Card from './Card';
import JustifiedRowItem from './JustifiedRowItem';

interface ItemProps {
  label: string;
  enframedLabel: string;
  termsLink?: string;
  paramsLink?: string;
  value: string;
  selected?: boolean;
  margin?: string;
  border?: string;
}

interface Props {
  asset: string;
  header: {
    iconName?: IconNames;
    iconImg?: string;
    title: string;
    link: string;
  };
  sections: {
    title?: string;
    items: ItemProps[];
  }[];
  onParameterClick: (value: string) => void;
  paramSelected?: string;
  onParamHover: (value?: string) => void;
  paramHover?: string;
}

const CollateralsCard = ({
  asset,
  header: { iconName, title, link, iconImg },
  sections,
  onParameterClick,
  paramSelected,
  onParamHover,
  paramHover,
}: Props) => {
  const onClick = useCallback(
    (value: string) => () => {
      onParameterClick(value === paramSelected ? '' : value);
    },
    [onParameterClick, paramSelected],
  );

  const onHover = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (value: string, asset: string) => () => {
      onParamHover(`${asset}_${value}`);
    },
    [onParamHover],
  );

  const onLeave = useCallback(
    () => () => {
      onParamHover();
    },
    [onParamHover],
  );
  const SectionsContainerView = React.memo(() => (
    <SectionsContainer>
      {sections.map(({ title: titleSection, items }) => (
        <GroupContainer key={Math.random()}>
          {!!items.filter(({ value }) => value !== '').length &&
            titleSection && (
              <JustifiedRowItem isTitleSection center label={titleSection} />
            )}
          {items
            .filter(({ value }) => value !== '')
            .map((item) => (
              <JustifiedRowItem
                key={Math.random()}
                alignItems="flex-start"
                onClick={onClick(item.enframedLabel)}
                onHover={onHover(item.enframedLabel, asset)}
                onLeave={onLeave()}
                {...item}
                selected={item.enframedLabel === paramSelected}
                hover={`${asset}_${item.enframedLabel}` === paramHover}
              />
            ))}
        </GroupContainer>
      ))}
    </SectionsContainer>
  ));

  const HeaderViewMemo = React.memo(() => (
    <Header>
      <FlexContainer flex="0.9">
        <Span height="30px">
          {iconName && !iconImg && (
            <Icon width={30} height={30} name={iconName} />
          )}
          {iconImg && (
            <img
              src={`/icons/${iconImg}`}
              alt="Icon"
              width={30}
              height={30}
            />
          )}
          <Label>{title}</Label>
        </Span>
      </FlexContainer>
      <FlexContainer flex="0.1" justifyContent="flex-end">
        <Span>
          <Link target="_blank" href={link}>
            <Icon width={15} height={15} name="openInNewIcon" fill="#2F80ED" />
          </Link>
        </Span>
      </FlexContainer>
    </Header>
  ));

  return (
    <Card>
      <HeaderViewMemo />
      <SectionsContainerView />
    </Card>
  );
};

const Header = styled.div`
  padding: 12px 30px 12px 30px;
  background: #d1eeeb;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexContainer = styled(Flex)`
  flex: ${({ flex }: { flex?: string }) => flex || '1'};
  justify-content: ${({
    justifyContent,
  }: {
    justifyContent?: string;
    flex?: string;
  }) => justifyContent || 'start'};
`;

const SectionsContainer = styled.div`
  padding: 11px 0px 0px 0px;
`;

const GroupContainer = styled.div`
  padding-bottom: 15px;
  :last-child {
    padding-bottom: 10px;
  }
`;

const Span = styled.span`
  display: ${({ display }: { display?: string; height?: string }) =>
    display || 'flex'};
  align-items: center;
  div {
    height: ${({ height }: { height?: string }) => height || ''};
  }
`;

const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #31394d;
  margin-left: 10px;
`;

const Link = styled.a`
  background: none;
  border: none;
  div {
    height: 15px;
  }
`;

export default CollateralsCard;
