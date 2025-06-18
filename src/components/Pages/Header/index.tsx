interface HeaderProps {
  title: string;
  subtitle?: string;
}
export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
