import { TimelineEvent } from "@components/TimelineView/Parts/Events";

export interface EventsBarProps {
  width: number;
  height: number;
  events: TimelineEvent[];
  isTouchEnabled: boolean;
  isKeyboardEnabled: boolean;
  totalWidth: number;
  visibleWidth: number;
  index: number;
  styles: any;
  indexClick: (index: number) => void;
  labelWidth: number;
  fillingMotion: object;
  barPaddingRight: number;
  barPaddingLeft: number;
}