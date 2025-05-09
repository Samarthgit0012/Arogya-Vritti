import { ComponentType, SVGProps } from 'react';
import React from 'react';

export interface Recommendation {
  id: string;
  type: 'diet' | 'exercise' | 'lifestyle' | 'warning' | 'success';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
} 