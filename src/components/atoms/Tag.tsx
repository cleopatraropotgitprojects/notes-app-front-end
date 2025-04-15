type TagProps = {
    label: string
    color?: string // #hex
    textColor?: string
}

export const Tag = ({ label, color = '#facc15', textColor = '#fff' }: TagProps) => (
    <span className="text-xs font-medium px-2 py-1 rounded-xl" style={{ backgroundColor: color, color: textColor }}>
    #{label}
  </span>
)
