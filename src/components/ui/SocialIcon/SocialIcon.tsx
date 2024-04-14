import { FC } from 'react';

import Image, { StaticImageData } from 'next/image';

import { ISocialLink } from '@/constants/social';

import facebookSvg from '../../../../public/social/facebook.svg';
import githubSvg from '../../../../public/social/github.svg';
import linkedinSvg from '../../../../public/social/linkedin.svg';
import telegramSvg from '../../../../public/social/telegram.svg';
import twitterSvg from '../../../../public/social/twitter.svg';

interface IconMap {
  [key: string]: StaticImageData;
}

const svgIcons:IconMap = {
  facebook: facebookSvg,
  linkedin: linkedinSvg,
  github: githubSvg,
  twitter: twitterSvg,
  telegram: telegramSvg,
};

export const SocialIcon: FC<ISocialLink> = ({ link, label }) => {
  const formattedLink = link.toLowerCase();
  const iconKey = Object.keys(svgIcons).find((key) => formattedLink.includes(key));

  if (iconKey) {
    return <Image width={32} height={32} src={svgIcons[iconKey]} alt={label} />;
  }

  return null;
};
