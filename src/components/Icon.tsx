import {
  Brain,
  Browser,
  Buildings,
  ChalkboardTeacher,
  ChartLineUp,
  Cloud,
  Code,
  Database,
  DeviceMobile,
  Gear,
  GraduationCap,
  Handshake,
  IdentificationBadge,
  Kanban,
  Lifebuoy,
  MagnifyingGlass,
  Package,
  PenNib,
  RocketLaunch,
  Scales,
  Stethoscope,
  Truck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { IconKey } from "@/content/site";

const MAP = {
  buildings: Buildings,
  browser: Browser,
  phone: DeviceMobile,
  users: UsersThree,
  chalkboard: ChalkboardTeacher,
  cloud: Cloud,
  database: Database,
  truck: Truck,
  code: Code,
  gear: Gear,
  brain: Brain,
  chart: ChartLineUp,
  kanban: Kanban,
  lifebuoy: Lifebuoy,
  pen: PenNib,
  scales: Scales,
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  package: Package,
  badge: IdentificationBadge,
  handshake: Handshake,
  rocket: RocketLaunch,
  search: MagnifyingGlass,
} as const;

export function Icon({ name, size = 22 }: { name: IconKey; size?: number }) {
  const Glyph = MAP[name];
  return <Glyph size={size} weight="duotone" aria-hidden />;
}

/** Bevelled square tile that holds an icon. */
export function IconTile({ name, size = 22 }: { name: IconKey; size?: number }) {
  return (
    <span className="notch grid size-14 flex-none place-items-center bg-slate text-signal shadow-[inset_0_1px_0_rgb(255_255_255/0.08),inset_0_-3px_0_rgb(0_0_0/0.4),inset_0_0_0_1px_rgb(57_255_136/0.15)]">
      <Icon name={name} size={size} />
    </span>
  );
}
