// M3 Empty State — used for 404 + future empty lists.

export function M3EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 gap-3">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl">
          {icon}
        </div>
      )}
      {title && <h2 className="m3-title-large text-base-content">{title}</h2>}
      {subtitle && (
        <p className="m3-body-medium text-base-content/65 max-w-xs">{subtitle}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default M3EmptyState;