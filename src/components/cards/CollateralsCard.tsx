import React from 'react';
import styled from 'styled-components';
import { Icon } from '..';
import { IconNames } from '../Icon/IconNames';
import JustifiedRowItem from './JustifiedRowItem';
import Flex from '../styledComponents/Flex';
import Card from './Card';

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
  header: {
    iconName?: IconNames;
    title: string;
    link: string;
  };
  sections: {
    title?: string;
    items: ItemProps[];
  }[];
}

const CollateralsCard = ({
  header: { iconName, title, link },
  sections,
}: Props) => (
  <Card>
    <Header>
      <FlexContainer flex="0.9">
        <Span height="30px">
          {iconName && <Icon width={30} height={30} name={iconName} />}
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
                {...item}
              />
            ))}
        </GroupContainer>
      ))}
    </SectionsContainer>
  </Card>
);

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
  padding: 11px 30px 20px 30px;
`;

const GroupContainer = styled.div`
  padding-bottom: 20px;
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
