interface CustomHeaderProps {
  title: string;
  subtitle?: string;
}
export function CustomHeader({ title, subtitle }: CustomHeaderProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
