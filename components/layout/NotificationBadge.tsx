interface NotificationBadgeProps {
  count: number;
}

export default function NotificationBadge({ count }: NotificationBadgeProps) {
  if (!count || count === 0) return null;

  return (
    <span
      className="
        absolute -top-1 -right-1
        min-w-[16px] h-4 px-0.5
        bg-red-500 text-white
        text-[10px] font-bold leading-none
        rounded-full flex items-center justify-center
        ring-2 ring-[var(--background)]
      "
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
