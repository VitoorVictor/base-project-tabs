interface HeaderProps {
  title: string;
  subtitle: string;
}
export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
