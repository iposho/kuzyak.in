import { FC, useMemo } from 'react';

import Image, { StaticImageData } from 'next/image';

import { ISocialLink } from '@/constants/social';

import facebookSvg from '../../../../public/social/facebook.svg';
import githubSvg from '../../../../public/social/github.svg';
import linkedinSvg from '../../../../public/social/linkedin.svg';
import telegramSvg from '../../../../public/social/telegram.svg';
import twitterSvg from '../../../../public/social/twitter.svg';

interface IIconMap {
  [key: string]: StaticImageData;
}

type TSocialIcon = Omit<ISocialLink, 'id'> & {
  width?: number;
  height?: number;
};

export const SocialIcon: FC<TSocialIcon> = ({
  link,
  label,
  width = 32,
  height = 32,
}) => {
  const svgIcons: IIconMap = useMemo(() => ({
    facebook: facebookSvg,
    linkedin: linkedinSvg,
    github: githubSvg,
    twitter: twitterSvg,
    telegram: telegramSvg,
  }), []);

  const formattedLink = link.toLowerCase();
  const iconKey = Object.keys(svgIcons).find((key) => formattedLink.includes(key));

  if (!iconKey) {
    return <div>X</div>;
  }

  return <Image width={width} height={height} src={svgIcons[iconKey]} alt={label} />;
};
